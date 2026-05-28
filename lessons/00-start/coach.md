# Lesson 00 — 바로 실전 시작

목표: 질문 없이 진행 파일을 만들고 바로 메모 앱 제작으로 넘어간다.

## Step 1. 진행 파일 만들기 `[step1]`

Claude가 실행:

```bash
node scripts/progress.mjs init
node scripts/progress.mjs step 0 step1
```

학습자에게:

> 바로 시작할게요. 이 실습은 질문으로 오래 풀지 않고, 먼저 메모 앱을 만든 뒤 GitHub Pages에 올려 웹주소로 확인하는 흐름이에요.

## Step 2. 다음 레슨으로 이동 `[done]`

Claude가 실행:

```bash
npm run check 0
node scripts/progress.mjs complete 0
```

통과하면 곧장 Lesson 01을 읽고 진행한다.

## Lesson 종료 조건

- `.progress.json` 생성
- Lesson 01로 넘어갈 준비 완료
