# Lesson 01 — 메모 앱 만들기

목표: GitHub Pages가 바로 배포할 수 있는 정적 메모 앱을 `docs/`에 만든다.

## Step 1. 앱 파일 만들기 `[create]`

Claude가 실행:

```bash
node scripts/apply-template.mjs
```

학습자에게:

> 메모 앱 파일을 `docs/` 폴더에 만들었어요. GitHub Pages는 나중에 이 폴더를 그대로 웹사이트로 보여줄 거예요.

## Step 2. 로컬에서 확인 `[local]`

Claude가 실행:

```bash
npm run serve
```

학습자에게:

> 브라우저에서 `http://localhost:4173`을 열어보세요. 메모를 하나 저장하고, 새로고침해도 남아있는지 확인해 주세요.

확인되면:

```bash
node scripts/progress.mjs step 1 local
```

## Step 3. 체크 `[done]`

Claude가 실행:

```bash
npm run check 1
node scripts/progress.mjs complete 1
```

통과하면 Lesson 02로 넘어간다.

## Lesson 종료 조건

- `docs/index.html`
- `docs/styles.css`
- `docs/app.js`
- 로컬 브라우저에서 메모 저장 확인
