# Lesson 03 — 웹으로 확인

목표: `netlify.app` 주소에서 메모 앱이 실제로 열리는지 확인한다.

## Step 1. 배포 주소 확인 `[url]`

Claude가 `.progress.json`을 확인한다.

```bash
npm run progress
```

`deployment.url`이 비어 있으면 Lesson 02의 Netlify CLI 익명 배포를 먼저 실행한다.

수동으로 URL을 다시 기록해야 할 때:

```bash
node scripts/progress.mjs deploy netlify <netlify.app-주소> [claim-주소]
```

## Step 2. 웹 응답 확인 `[fetch]`

Claude가 실행:

```bash
npm run check 3
```

Netlify 배포 직후에는 주소가 열리기까지 잠깐 걸릴 수 있다. 실패하면 잠시 후 다시 실행한다.

## Step 3. 브라우저로 확인 `[browser]`

학습자에게:

> 이제 배포된 주소를 브라우저에서 열어보세요. 메모를 저장하고 새로고침해도 남아 있으면 끝입니다.

완료 기록:

```bash
node scripts/progress.mjs step 3 done
node scripts/progress.mjs complete 3
```

## Lesson 종료 조건

- `netlify.app` 주소가 HTTP 200 응답
- 브라우저에서 메모 앱 화면 확인
- 메모 저장 후 새로고침 유지 확인
