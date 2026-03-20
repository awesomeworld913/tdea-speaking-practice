# TDEA 말하기 연습 웹앱 - 구현 플랜

## Context
토도영어 아카데미(TDEA) 커리큘럼 기반 영어 말하기 연습 웹앱. 사전 생성된 대화 스크립트(유닛당 5개: 2인 대화 4개 + 독백 1개)를 기반으로 학생들이 역할극, 쉐도잉, 빈칸 퀴즈 등의 방식으로 말하기 연습을 할 수 있다.

**핵심 특징**: API 호출 없이 사전 생성된 스크립트 데이터만으로 동작하는 정적 웹앱.

---

## 1. 기술 스택
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** (한국어 UI)
- 외부 API 의존성 없음 (정적 데이터 사용)

## 2. 데이터
- Level 1 (12유닛) + Level 2 (12유닛) = 24유닛
- 유닛당 5개 스크립트 = 총 120개 스크립트
- `src/data/scripts.ts`에 모든 스크립트 데이터 포함

### 스크립트 생성 규칙
- **참조 컬럼**: Level, Unit, Unit Topic, Unit Learning Objectives, Unit Words, Expression Pattern, Grammar 1-4
- **Expression Pattern이 핵심 구조**: 모든 대화의 문장 구조가 Expression Pattern을 따름
- **Level 1**: 현재시제만 사용, 독백 5-6문장
- **Level 2**: 과거/미래시제 허용 (Grammar에 따라), 독백 6-8문장
- **자연스러운 대화 흐름** + 약간의 위트/유머

### 캐릭터 쌍 (4개 로테이션)
1. Mina & Jake
2. Sora & Brian
3. Emma & Jiho
4. Tom & Hana

### 독백 유형 (로테이션)
announcement, advertisement, guide, news, voicemail

## 3. 연습 모드

### 역할 연습 (Role Play)
- 대화 스크립트에서 역할(Speaker A/B) 선택
- 상대방 대사는 보이고, 내 대사는 숨김
- 직접 말한 후 탭하여 정답 확인
- 순서대로 진행 (현재 차례 하이라이트)

### 쉐도잉 (Shadowing)
- 한 줄씩 표시하며 따라 읽기
- "다음 문장" 버튼으로 진행
- "전체 보기" 토글 가능

### 빈칸 퀴즈 (Quiz)
- 핵심 단어를 빈칸으로 처리
- 빈칸 탭하여 정답 확인
- 3글자 이하 단어는 빈칸 처리 안 함

## 4. UI 흐름

```
[홈] 레벨 선택 → 유닛 목록
  ↓
[유닛] 5개 스크립트 카드 (미리보기 포함)
  ↓ (역할 연습 / 쉐도잉 / 빈칸 퀴즈 버튼)
[연습] 선택한 모드로 연습 진행
```

## 5. 향후 확장 가능
- Level 0, 3, 4 스크립트 추가 (42유닛)
- TTS(음성합성) 연동
- 진행률 저장 (localStorage)
- 음성 인식을 통한 발음 체크
