# Lesson 00 — 환영 + 제품 인터뷰

목표: 앱을 바로 만들어버리지 않고, 학습자와 짧은 제품 인터뷰를 하며 무엇을 만들지, 누구를 위한지, 어떻게 반응해야 하는지, 어떤 디자인을 원하는지 함께 정한다.

## Step 1. 환영 인사 `[welcome]`

Claude가 실행:

```bash
node scripts/progress.mjs init
node scripts/progress.mjs step 0 welcome
```

학습자에게:

> 환영합니다. 이번에는 제가 혼자 앱을 뚝딱 만드는 게 아니라, 작은 제품을 같이 기획하고 화면에 반영해볼게요.
>
> 먼저 `What`, `Who`, `Behavior`, `Errors`, `Out of Scope`, `Design` 여섯 가지만 짧게 물어볼게요. 답은 한두 문장으로 충분합니다.

## Step 2. What — 무엇을 만들지 `[what]`

학습자에게:

> What: 무엇을 만들지 한 줄로 정의해볼까요? 예: `회의 후 할 일을 빠르게 정리하는 메모 앱`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 what "<학습자 답변>"
node scripts/progress.mjs step 0 what
```

## Step 3. Who — 타겟 사용자 `[who]`

학습자에게:

> Who: 이 앱을 가장 먼저 쓸 사용자 1명을 구체적으로 정해볼게요. 예: `매주 회의를 정리하는 운영팀 리더`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 who "<학습자 답변>"
node scripts/progress.mjs step 0 who
```

## Step 4. Behavior — 액션과 반응 `[behavior]`

학습자에게:

> Behavior: 화면에서 사용자가 하는 액션과 시스템 반응을 써볼까요? 예: `메모를 입력하고 저장하면 목록에 추가되고, 완료 체크하면 완료 상태로 바뀐다`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 behavior "<학습자 답변>"
node scripts/progress.mjs step 0 behavior
```

## Step 5. Errors — 실패 상황과 메시지 `[errors]`

학습자에게:

> Errors: 실패 상황과 보여줄 메시지를 미리 정해볼게요. 예: `빈 메모를 저장하면 "내용을 먼저 적어주세요"라고 알려준다`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 errors "<학습자 답변>"
node scripts/progress.mjs step 0 errors
```

## Step 6. Out of Scope — 이번 버전에서 안 할 것 `[outOfScope]`

학습자에게:

> Out of Scope: 이번 버전에서 절대 만들지 않을 것을 정해볼까요? 예: `로그인, 팀 동기화, 알림은 만들지 않는다`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 outOfScope "<학습자 답변>"
node scripts/progress.mjs step 0 outOfScope
```

## Step 7. Design — 원하는 디자인 `[design]`

학습자에게:

> Design: 원하는 디자인 분위기를 알려주세요. 예: `차분한 파랑의 업무툴`, `밝고 친근한 개인 노트`, `여백이 많은 미니멀 스타일`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 design "<학습자 답변>"
node scripts/progress.mjs step 0 design
```

튜터는 이 답변을 Lesson 01의 디자인 적용 단계에서 색상, 여백, 카드 톤에 반영한다.

## Step 8. 제품 기획 요약 `[summary]`

Claude는 `.progress.json`의 Lesson 00 답변을 읽고 학습자에게 제품 기획 요약을 되짚는다.

> 좋아요. 정리하면:
>
> - What: `<what>`
> - Who: `<who>`
> - Behavior: `<behavior>`
> - Errors: `<errors>`
> - Out of Scope: `<outOfScope>`
> - Design: `<design>`
>
> 다음 단계에서 이 답변을 실제 메모 앱 화면과 디자인에 반영하겠습니다.

실행:

```bash
npm run check 0
node scripts/progress.mjs complete 0
```

## Lesson 종료 조건

- 환영 인사 완료
- What 답변 저장
- Who 답변 저장
- Behavior 답변 저장
- Errors 답변 저장
- Out of Scope 답변 저장
- Design 답변 저장
