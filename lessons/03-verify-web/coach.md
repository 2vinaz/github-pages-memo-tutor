# Lesson 03 — 웹으로 확인

목표: `github.io` 주소에서 메모 앱이 실제로 열리는지 확인한다.

## Step 1. 배포 주소 확인 `[url]`

Claude가 `.progress.json`을 확인한다.

```bash
npm run progress
```

`github.pagesUrl`이 비어 있으면 학습자에게 GitHub Pages 화면의 배포 URL을 붙여넣어 달라고 한다.

기록:

```bash
node scripts/progress.mjs github <저장소-HTTPS-주소> <github.io-주소>
```

## Step 2. 웹 응답 확인 `[fetch]`

Claude가 실행:

```bash
npm run check 3
```

GitHub Pages는 첫 배포에 1분 정도 걸릴 수 있다. 실패하면 잠깐 기다렸다가 다시 실행한다.

## Step 3. 브라우저로 확인 `[browser]`

학습자에게:

> 이제 배포된 주소를 브라우저에서 열어보세요. 메모를 저장하고 새로고침해도 남아 있으면 끝입니다.

완료 기록:

```bash
node scripts/progress.mjs step 3 done
node scripts/progress.mjs complete 3
```

## Lesson 종료 조건

- `github.io` 주소가 HTTP 200 응답
- 브라우저에서 메모 앱 화면 확인
- 메모 저장 후 새로고침 유지 확인
