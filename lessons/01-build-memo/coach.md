# Lesson 01 — 인터뷰 답변으로 메모 앱 함께 만들기

목표: Lesson 00에서 들은 인터뷰 답변을 바탕으로 앱 이름, 안내 문구, placeholder를 반영한 정적 메모 앱을 만든다.

## Step 1. 인터뷰 답변 확인 `[review]`

Claude가 `.progress.json`을 읽고 Lesson 00 답변을 확인한다.

학습자에게:

> 아까 함께 정한 방향을 화면에 넣어볼게요.
>
> - 앱 이름: `<appName>`
> - 주로 남길 메모: `<memoUse>`
> - 누가 쓸 앱인지: `<audience>`
>
> 이제 이 내용이 제목, 설명, 입력창 placeholder에 들어가게 만들겠습니다.

실행:

```bash
node scripts/progress.mjs step 1 review
```

## Step 2. 기본 파일 만들기 `[create]`

Claude가 실행:

```bash
node scripts/apply-template.mjs
```

학습자에게:

> 먼저 기본 뼈대를 만들었어요. 아직은 기본 메모 앱이고, 다음에 함께 정한 내용을 입힙니다.

## Step 3. 함께 정한 내용 반영 `[customize]`

Claude가 실행:

```bash
node scripts/customize-app.mjs
```

학습자에게:

> 이제 인터뷰 답변을 반영했습니다. 앱 이름과 입력창 placeholder가 학습자분 답변에 맞게 바뀌었어요.

실행:

```bash
node scripts/progress.mjs step 1 customize
```

## Step 4. 로컬에서 확인 `[local]`

Claude가 실행:

```bash
npm run serve
```

학습자에게:

> 브라우저에서 `http://localhost:4173`을 열어보세요. `localhost`는 지금 이 튜터가 실행 중인 컴퓨터 안에서만 열리는 주소입니다. 포트가 이미 켜져 있다고 나오면 기존 미리보기 서버를 그대로 쓰면 되고, 방금 함께 정한 앱 이름이 보이는지, 메모를 하나 저장하고 새로고침해도 남아있는지 확인해 주세요.

확인되면:

```bash
node scripts/progress.mjs step 1 local
```

## Step 5. 짧은 풀이 `[explain]`

학습자에게:

> 지금 만든 건 서버 없이 브라우저 안에 저장되는 메모 앱입니다. GitHub Pages에 올려도 같은 방식으로 작동해요. 단, 다른 기기와 자동 동기화되는 앱은 아니고, 지금 브라우저에 저장되는 작은 웹앱입니다.

## Step 6. 체크 `[done]`

Claude가 실행:

```bash
npm run check 1
node scripts/progress.mjs complete 1
```

통과하면 Lesson 02로 넘어간다.

## Lesson 종료 조건

- 인터뷰 답변 확인
- `docs/index.html`
- `docs/styles.css`
- `docs/app.js`
- 앱 이름, 설명, placeholder에 함께 정한 내용 반영
- 로컬 브라우저에서 메모 저장 확인
