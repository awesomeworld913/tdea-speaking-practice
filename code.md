# TDEA 리스닝 스크립트 생성기 - 코드 문서

## 프로젝트 개요

토도영어 아카데미(TDEA) 커리큘럼 데이터를 기반으로, Claude API를 활용하여 영어 듣기 연습용 대화 스크립트를 자동 생성하는 Next.js 웹 앱.

- **기술 스택**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + @anthropic-ai/sdk
- **생성 단위**: 유닛당 5개 (2인 대화 4개 + 독백 1개)

---

## 파일 구조

```
tdea-listening-generator/
├── public/data/                    # 커리큘럼 원본 데이터
│   ├── CEFR_wordlist.tsv          # CEFR 레벨별 어휘 목록
│   ├── curriculum.txt             # 커리큘럼 (레벨/유닛/단어/표현/문법)
│   └── learning_map.tsv           # 학습맵 코드 (도메인/기준)
├── src/
│   ├── lib/                       # 핵심 로직 (서버사이드)
│   │   ├── types.ts               # 타입 정의
│   │   ├── parseCurriculum.ts     # 커리큘럼 TSV 파서
│   │   ├── buildPrompt.ts         # Claude 프롬프트 생성
│   │   └── claudeClient.ts        # Anthropic SDK 래퍼
│   ├── components/                # UI 컴포넌트 (클라이언트)
│   │   ├── ApiKeyInput.tsx        # API 키 입력/저장
│   │   ├── LevelUnitSelector.tsx  # 레벨→유닛 드롭다운
│   │   ├── UnitSummary.tsx        # 유닛 정보 미리보기
│   │   ├── ScriptDisplay.tsx      # 결과 전체 렌더링
│   │   ├── ConversationCard.tsx   # 개별 대화/독백 카드
│   │   └── DownloadButton.tsx     # TXT/JSON 다운로드
│   └── app/
│       ├── layout.tsx             # 루트 레이아웃 (한국어)
│       ├── page.tsx               # 메인 페이지 (전체 조립)
│       └── api/
│           ├── units/route.ts     # GET: 유닛 목록 / 유닛 상세
│           └── generate/route.ts  # POST: 스크립트 생성
```

---

## 1. 타입 정의 — `src/lib/types.ts`

```typescript
// 표현 세트 (유닛당 최대 5개)
interface ExpressionSet {
  titleEn: string;    // 표현 제목 (영어) — "Greeting", "Asking about names" 등
  titleJa: string;    // 표현 제목 (일어)
  examples: string;   // 예문 — "- Hi! / Hello! - Good morning!" 등
}

// 유닛 데이터 (커리큘럼에서 파싱된 한 유닛의 전체 정보)
interface UnitData {
  levelId: string;          // "cr_0", "cr_1" 등
  unitId: string;           // "cr_0_1", "cr_1_3" 등 (고유 키)
  cefrLevel: string;        // "Pre A1", "A1", "A2"
  levelNumber: number;      // 0~4 (토도영어 레벨)
  unitNumber: number;       // 1~15 (유닛 번호)
  unitTitle: string;        // "First Day Vibes"
  unitTopic: string;        // "Greetings"
  subtopics: string[];      // ["새 학기 첫날 First day of school", ...]
  unitObjectiveKr: string;  // "간단하게 인사하고 이름을 소개할 수 있다."
  unitObjectiveEn: string;  // "Can greet people and introduce names."
  unitWords: string[];      // ["hello", "hi", "goodbye", ...]
  expressionPattern: string; // "I'm _(name). My name is _(name)."
  expressions: ExpressionSet[]; // 최대 5개 표현 세트
  grammar: string[];        // 문법 항목 (최대 4개)
  preExposedGrammar: string; // 사전노출 문법
}

// Claude API 생성 결과
interface ConversationSet {
  id: number;                    // 1~5
  type: "dialogue" | "monologue";
  title: string;                 // 대화 제목
  monologueType?: string;        // "announcement" | "advertisement" 등 (독백만)
  speakers?: string[];           // ["Mina", "Jake"] (대화만)
  lines: ScriptLine[];           // 대화 내용
}

interface ScriptLine {
  speaker: string;  // 화자 이름 ("" = 독백 나레이터)
  text: string;     // 영어 문장
}
```

---

## 2. 커리큘럼 파서 — `src/lib/parseCurriculum.ts`

커리큘럼 TSV 파일을 읽어 `Map<unitId, UnitData>`로 변환.

### 핵심 로직

```
curriculum.txt 구조:
- 행 1~5: 헤더/주석 → 스킵
- 행 6~: 데이터 (탭 구분)
- 컬럼 매핑:
  [0] Level ID  [1] Unit ID  [3] CEFR  [4] Level  [5] Unit
  [6] Unit Type  [7] Lesson  [10] 목표(한)  [11] 목표(영)
  [13] Title  [14] Topic  [15-17] Subtopics
  [20] Words  [22] Expression Pattern
  [23-37] Expressions 1-5 (title_en, title_ja, examples × 5)
  [38-41] Grammar 1-4  [42] Pre-exposed Grammar
```

### 주요 함수

| 함수 | 역할 |
|------|------|
| `parseCurriculum()` | TSV → `Map<string, UnitData>`. lesson=1인 행만 파싱 (유닛 데이터는 1번 레슨에만 존재). level test 유닛 제외. |
| `getUnitSelectorItems()` | 드롭다운용 경량 목록 반환 (unitId, level, unit, title, topic만) |
| `getCumulativeWords(units, target)` | 같은 레벨의 **이전 유닛 단어를 모두 누적**하여 반환. Unit 3 선택 시 Unit 1+2+3 단어 합산. |

### 누적 어휘 로직

```
Level 0, Unit 3 (Feelings) 선택 시:
→ Unit 1 단어: hello, hi, goodbye, bye, name, I, you, ...
→ Unit 2 단어: he, she, we, his, her, new, cool, kind, ...
→ Unit 3 단어: yes, no, today, fine, great, happy, sad, ...
→ 프롬프트에 전체 합산된 단어 목록 전달
```

---

## 3. 프롬프트 생성 — `src/lib/buildPrompt.ts`

Claude API에 보낼 system/user 프롬프트 구성.

### System Prompt 핵심 규칙
1. 제시된 단어 + 기본 기능어만 사용
2. 표현 패턴/문법 범위 내에서만 작성
3. 난이도 엄격 준수
4. 다양한 캐릭터명 (한국/서양 혼합)
5. 출력: JSON 배열 5개 (대화4 + 독백1)

### User Prompt 구성

```
📚 레벨 정보 + 유닛 정보
⚡ 난이도 가이드 (레벨별 문장 길이/시제/문법 범위)
📗 누적 어휘 목록
📘 표현 패턴
📙 표현 세트 1~5 (제목 + 예문)
📕 문법
```

### 레벨별 난이도 가이드

| 레벨 | 문장 길이 | 시제 | 특징 |
|------|-----------|------|------|
| Level 0 | 2-5단어 | 현재(be동사) | 인사, 소개, 기본 명사/형용사 |
| Level 1 | 3-7단어 | 현재 단순 | 단순 질문/응답, 기본 접속사 |
| Level 2 | 4-8단어 | 현재+과거 | Wh-질문, 시간 표현 |
| Level 3 | 5-10단어 | 현재+과거+미래 | 비교급/최상급, 복합문 |
| Level 4 | 6-12단어 | 현재완료 포함 | 의견 표현, 기초 관계절 |

---

## 4. Claude API 래퍼 — `src/lib/claudeClient.ts`

```typescript
// 사용 모델: claude-sonnet-4-20250514
// max_tokens: 4096
// temperature: 0.7 (자연스러운 대화를 위한 적당한 창의성)

generateScripts(apiKey, systemPrompt, userPrompt) → ConversationSet[]
```

- 응답에서 텍스트 블록 추출
- 마크다운 코드 블록 자동 제거 (```json ... ```)
- JSON 파싱 후 5개 배열 검증

---

## 5. API 라우트

### `GET /api/units` — 유닛 목록/상세 조회

```
GET /api/units              → UnitSelectorItem[] (전체 유닛 목록, 레벨/유닛 번호 순 정렬)
GET /api/units?unitId=cr_0_1 → UnitData (유닛 상세 정보)
```

### `POST /api/generate` — 스크립트 생성

```
Request:  { unitId: "cr_0_1", apiKey: "sk-ant-..." }
Response: { conversations: [...], unitTitle, unitTopic, levelNumber, cefrLevel }
```

**처리 흐름:**
1. 입력 검증 (apiKey, unitId)
2. `parseCurriculum()` → 대상 유닛 추출
3. `getCumulativeWords()` → 누적 어휘 수집
4. `buildPrompt()` → system/user 프롬프트 구성
5. `generateScripts()` → Claude API 호출
6. 결과 JSON 반환

**에러 처리:**
- 401: API 키 미입력 또는 유효하지 않음
- 400: 유닛 미선택
- 404: 유닛을 찾을 수 없음
- 429: API 요청 한도 초과
- 500: 기타 서버 에러

---

## 6. UI 컴포넌트

### `ApiKeyInput.tsx` — API 키 관리
- `localStorage`에 키 저장/복원 (키: `tdea_api_key`)
- 저장됨/입력/편집 세 가지 상태
- password 타입 입력, 마스킹 표시
- 변경/삭제 기능

### `LevelUnitSelector.tsx` — 레벨→유닛 선택
- 레벨 드롭다운: Level 0 (Pre-A1) ~ Level 4 (A2)
- 유닛 드롭다운: 선택된 레벨에 해당하는 유닛만 필터링
- 형식: "Unit {N} - {Title} ({Topic})"
- 레벨 변경 시 유닛 선택 초기화

### `UnitSummary.tsx` — 유닛 정보 미리보기
유닛 선택 시 표시되는 파란색 정보 카드:
- 레벨/유닛/제목
- 토픽, CEFR, 소재
- 학습목표 (한국어)
- 단어 목록 (처음 20개 + 나머지 개수)
- 표현 패턴 (제목 + 예문 미리보기)
- 문법 항목

### `ScriptDisplay.tsx` + `ConversationCard.tsx` — 결과 표시
- 전체 결과 헤더 (레벨 + 유닛 제목)
- 대화 카드: 보라색 헤더, 화자별 색상 구분 (파랑/로즈)
- 독백 카드: 노란색 헤더, monologueType 뱃지
- 화자 이름 볼드 + 대사 텍스트

### `DownloadButton.tsx` — 파일 다운로드
**TXT 형식:**
```
===================================
TDEA 리스닝 스크립트
Level 0 (Pre A1) - Greetings
Title: First Day Vibes
===================================

[대화 1] Meeting a New Friend
(Mina & Jake)
---
Mina: Hi! I'm Mina.
Jake: Hello! My name is Jake.
```

**JSON 형식:** GenerationResponse 객체 그대로 (들여쓰기 포함)

파일명: `TDEA_L{레벨}_{토픽}_scripts.{txt|json}`

---

## 7. 메인 페이지 — `src/app/page.tsx`

모든 컴포넌트를 조립하는 싱글 페이지 클라이언트 컴포넌트.

### 상태 관리 (useState)
| 상태 | 타입 | 용도 |
|------|------|------|
| `apiKey` | string | Claude API 키 |
| `units` | UnitSelectorItem[] | 전체 유닛 목록 |
| `selectedLevel` | number \| null | 선택된 레벨 |
| `selectedUnitId` | string \| null | 선택된 유닛 ID |
| `unitDetail` | UnitData \| null | 유닛 상세 (미리보기용) |
| `result` | GenerationResponse \| null | 생성 결과 |
| `loading` | boolean | 생성 중 여부 |
| `error` | string \| null | 에러 메시지 |

### 데이터 플로우
```
[페이지 로드]
  → GET /api/units → units 상태 설정

[유닛 선택]
  → GET /api/units?unitId=... → unitDetail 설정 → UnitSummary 표시

[생성 버튼 클릭]
  → POST /api/generate { unitId, apiKey }
  → 서버: 커리큘럼 파싱 → 프롬프트 구성 → Claude API 호출
  → 결과: ScriptDisplay + DownloadButton 표시
```

### UI 섹션 (위→아래)
1. 헤더 (타이틀 + 설명)
2. API 키 입력
3. 레벨/유닛 선택
4. 유닛 정보 미리보기 (선택 시)
5. 생성 버튼 (+ 로딩 스피너)
6. 에러 메시지 (발생 시)
7. 다운로드 버튼 (상단)
8. 스크립트 결과 표시
9. 다운로드 버튼 (하단)
10. 푸터

---

## 8. 실행 방법

```bash
cd tdea-listening-generator
npm install
npm run dev
# → http://localhost:3000
```

## 9. 커리큘럼 데이터 규모

| 레벨 | CEFR | 유닛 수 |
|------|------|---------|
| Level 0 | Pre-A1 | 12 |
| Level 1 | A1 | 12 |
| Level 2 | A1 | 12 |
| Level 3 | A2 | 15 |
| Level 4 | A2 | 15 |
| **합계** | | **66 유닛** |

유닛당 5개 스크립트 → 전체 **330개** 대화세트 생성 가능.
