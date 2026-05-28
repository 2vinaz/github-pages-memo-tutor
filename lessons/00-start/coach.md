# Lesson 00 — 환영 + 짧은 인터뷰

목표: 앱을 바로 만들어버리지 않고, 학습자와 짧게 이야기해서 어떤 메모 앱을 만들지 함께 정한다.

## Step 1. 환영 인사 `[welcome]`

Claude가 실행:

```bash
node scripts/progress.mjs init
node scripts/progress.mjs step 0 welcome
```

학습자에게:

> 환영합니다. 이번에는 제가 혼자 앱을 뚝딱 만드는 게 아니라, 학습자분이 어떤 메모 앱을 원하는지 짧게 듣고 같이 만들어볼게요.
>
> 바로 만들기 전에 딱 세 가지만 물어볼게요. 길게 답하지 않으셔도 됩니다.

## Step 2. 인터뷰 1 — 앱 이름 `[appName]`

학습자에게:

> 이 메모 앱 이름을 뭐라고 부르면 좋을까요? 예: `내 메모`, `회의 메모장`, `아이디어 노트`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 appName "<학습자 답변>"
node scripts/progress.mjs step 0 appName
```

## Step 3. 인터뷰 2 — 어떤 메모인지 `[memoUse]`

학습자에게:

> 어떤 메모를 주로 남기고 싶으세요? 예: `오늘 할 일`, `회의 끝나고 할 일`, `문득 떠오른 아이디어`

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 memoUse "<학습자 답변>"
node scripts/progress.mjs step 0 memoUse
```

## Step 4. 인터뷰 3 — 누가 쓸 앱인지 `[audience]`

학습자에게:

> 누가 쓸 앱으로 생각하면 될까요? 혼자 쓰는 앱인지, 팀원이 같이 보는 앱인지 정도만 알려주세요.

답을 받으면 Claude가 실행:

```bash
node scripts/progress.mjs check 0 audience "<학습자 답변>"
node scripts/progress.mjs step 0 audience
```

## Step 5. 한 줄로 정리 `[summary]`

Claude는 `.progress.json`의 Lesson 00 답변을 읽고 학습자에게 한 줄로 되짚는다.

> 그러면 `<앱 이름>`이라는 이름으로, `<어떤 메모>`를 남기는, `<누가 쓸>` 메모 앱으로 시작해볼게요. 다음 단계에서 이 답변을 실제 화면에 반영하겠습니다.

실행:

```bash
npm run check 0
node scripts/progress.mjs complete 0
```

## Lesson 종료 조건

- 환영 인사 완료
- 앱 이름 답변 저장
- 어떤 메모인지 답변 저장
- 누가 쓸 앱인지 답변 저장
