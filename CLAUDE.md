# TDEA 말하기 연습 웹앱

## 프로젝트 설명
토도영어 아카데미(TDEA) 커리큘럼 기반 영어 말하기 연습 웹앱. API 없이 사전 생성된 스크립트만으로 동작.

## 기술 스택
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS

## 실행 방법
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
```

## 핵심 아키텍처

### 데이터 흐름
```
src/data/scripts.ts (사전 생성된 120개 스크립트)
  → page.tsx (레벨/유닛 선택)
  → 연습 모드 (역할극 / 쉐도잉 / 빈칸 퀴즈)
```

### 주요 파일
- `src/data/scripts.ts` — 전체 스크립트 데이터 (Level 1-2, 24유닛 × 5개)
- `src/app/page.tsx` — 메인 페이지. 모든 화면/컴포넌트 포함 (싱글 파일)
- `src/app/layout.tsx` — 루트 레이아웃
- `src/app/globals.css` — 글로벌 스타일 + 애니메이션

### 연습 모드
| 모드 | 설명 |
|------|------|
| 역할 연습 | 역할 선택 → 내 대사 숨김 → 탭하여 확인 |
| 쉐도잉 | 한 줄씩 따라 읽기 / 전체 보기 |
| 빈칸 퀴즈 | 핵심 단어 빈칸 → 탭하여 정답 확인 |

## 스크립트 데이터 구조
```typescript
interface UnitScripts {
  unitId: string;       // "cr_1_1"
  levelNumber: number;  // 1 또는 2
  unitNumber: number;   // 1~12
  unitTopic: string;    // "Hobbies"
  conversations: ConversationSet[];  // 5개 (대화4 + 독백1)
}
```

## 스크립트 생성 규칙
- **참조 컬럼**: Level, Unit, Unit Topic, Learning Objectives, Unit Words, Expression Pattern, Grammar 1-4
- Expression Pattern이 모든 대화의 구조적 뼈대
- Level 1: 현재시제만 / Level 2: 과거·미래 허용
- 캐릭터 쌍 4조 로테이션: Mina&Jake, Sora&Brian, Emma&Jiho, Tom&Hana

## 커리큘럼 규모
- Level 1: 12유닛, Level 2: 12유닛 (현재 구현)
- 유닛당 5개 스크립트 → 총 120개
- 향후 Level 0, 3, 4 추가 가능 (42유닛 추가)

## UI/UX
- 대상: 한국인 영어 학습자/선생님
- 한국어 UI
- 모바일 반응형
