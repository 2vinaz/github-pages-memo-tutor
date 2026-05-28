# Lesson 02 — Netlify CLI 익명 배포

목표: 별도 계정 없이, Claude가 Netlify CLI의 익명 배포 기능으로 `docs/` 정적 사이트를 웹에 올리고 URL을 기록한다.

## Step 1. 배포 전 공개 범위 확인 `[privacy]`

학습자에게:

> 이번 배포는 계정 없이 Netlify CLI로 진행합니다. 별도 저장소를 만들지 않고, 로그인도 하지 않습니다.
>
> 다만 만들어지는 `netlify.app` 주소는 공개 URL입니다. 실제 개인 메모나 민감한 문구는 넣지 말고 실습용 내용만 올릴게요.

실행:

```bash
node scripts/progress.mjs step 2 privacy
```

## Step 2. 정적 파일 확인 `[files]`

Claude가 실행:

```bash
test -f docs/index.html
test -f docs/styles.css
test -f docs/app.js
```

파일이 없으면 Lesson 01로 돌아간다.

## Step 3. Netlify CLI 익명 배포 `[deploy]`

Claude가 학습자에게:

> 이제 Netlify CLI로 `docs/` 폴더만 업로드하겠습니다. `--allow-anonymous` 옵션을 쓰기 때문에 Netlify 계정 없이 임시 배포 URL을 받을 수 있어요.

Claude가 실행:

```bash
npm run deploy:netlify
```

이 명령이 내부에서 하는 일:

```bash
npx --yes netlify-cli@latest deploy --allow-anonymous --dir docs --no-build --json
node scripts/progress.mjs deploy netlify <netlify.app-주소> [claim-주소]
```

안내 포인트:

- `--allow-anonymous`: 로그인하지 않고 claim 가능한 임시 사이트를 만든다.
- `--dir docs`: `docs/` 폴더를 배포 원본으로 쓴다.
- `--no-build`: 이미 만들어진 정적 파일만 업로드한다.
- `--json`: Claude가 배포 URL을 읽어 진도 파일에 기록한다.
- claim 주소가 나오면 계정을 만들고 싶을 때만 나중에 사이트를 소유권 등록할 수 있다.

## Step 4. 막혔을 때 `[fallback]`

`npx` 다운로드나 네트워크가 막히면 학습자에게:

> 지금은 CLI 다운로드나 네트워크가 막힌 상태예요. 같은 결과를 브라우저에서 만들려면 Netlify Drop에 `docs/` 폴더를 드래그앤드롭하면 됩니다. 그래도 기본 실습 경로는 계정 없는 CLI 배포로 유지합니다.

## Step 5. 체크 `[done]`

Claude가 실행:

```bash
npm run check 2
node scripts/progress.mjs complete 2
```

통과하면 Lesson 03으로 넘어가서 웹으로 확인한다.

## Lesson 종료 조건

- `docs/` 정적 파일 확인
- Netlify CLI 익명 배포 실행
- `netlify.app` URL 기록
- 계정 생성 없이 배포 URL 확보
