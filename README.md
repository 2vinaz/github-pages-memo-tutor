# netlify-memo-tutor

Netlify CLI 익명 배포로 바로 웹에 올라가는 메모 앱을 만드는 실전형 튜터 저장소입니다.

학습자는 Claude 데스크탑 앱에서 튜터와 짧은 제품 인터뷰를 하며 What, Who, Behavior, Errors, Out of Scope, Design을 정하고, 그 답변이 실제 화면과 디자인에 반영되는 과정을 함께 봅니다. Claude가 파일을 만들고 명령을 실행하며, 학습자는 말로 답하고 브라우저에서 배포된 웹사이트를 확인합니다.

## 무엇을 만들까요?

- `docs/index.html`, `docs/styles.css`, `docs/app.js` 로 구성된 정적 메모 앱
- 브라우저 `localStorage`에 메모 저장
- Netlify CLI 익명 배포
- 최종 주소: `https://<임시이름>.netlify.app/`

Netlify CLI는 정적 사이트 폴더를 바로 업로드할 수 있습니다. 이 저장소는 빌드 과정이 필요 없도록 **docs folder**를 배포 원본으로 씁니다.

## 시작하기

Claude 데스크탑 앱의 Code 탭에서 이 폴더를 열고 다음 중 하나를 입력하세요.

- `/tutor`
- `실전 시작`
- `바로 만들자`
- `이어서 할래`

이 폴더를 복사해서 새 학습자와 다시 시작한다면 먼저 진행 기록을 초기화할 수 있습니다.

```bash
node scripts/progress.mjs reset
```

`.progress.json`은 학습자별 로컬 진행 기록입니다. 이전 진행 기록이 있으면 튜터는 바로 Lesson 01로 넘어가지 않고, 이어서 할지 처음부터 할지 확인해야 합니다.

## 학습 흐름

| # | 주제 | 결과 |
|---|------|------|
| 00 | 환영 + 제품 인터뷰 | What, Who, Behavior, Errors, Out of Scope, Design 정하기 |
| 01 | 함께 메모 앱 만들기 | 제품 기획 요약과 디자인 답변을 반영한 `docs/` 정적 앱 생성, 로컬 확인 |
| 02 | Netlify CLI 배포 | 계정 없이 `docs/` 폴더 익명 배포 |
| 03 | 웹으로 확인 | `netlify.app` 주소 접속 확인, 마무리 |

## 명령

```bash
npm run progress
npm run check 1
npm run serve
npm run deploy:netlify
```

`npm run serve`는 `docs/` 폴더를 로컬 웹사이트로 띄웁니다. 배포 전 빠른 확인용입니다.

## Netlify 배포도 튜터가 안내합니다

Lesson 02에서는 별도 계정 없이 CLI 배포부터 같이 갑니다.

계정 없는 자동 경로:

```bash
npm run deploy:netlify
```

내부에서는 Netlify CLI의 익명 배포 옵션을 씁니다.

```bash
npx --yes netlify-cli@latest deploy --allow-anonymous --dir docs --no-build --json
```

`--allow-anonymous` 덕분에 계정 없이 임시 `netlify.app` URL을 받을 수 있습니다. 단, 배포 URL은 공개 주소이므로 실습용 문구만 올리고 민감한 내용은 넣지 않습니다.

## 참고

이 저장소는 서버, 데이터베이스, 프레임워크 없이 갑니다. Netlify에서 바로 확인하는 것이 목표라서 정적 파일만 사용합니다.
