# github-pages-memo-tutor

GitHub Pages에 바로 올라가는 메모 앱을 만드는 실전형 튜터 저장소입니다.

학습자는 Claude 데스크탑 앱에서 튜터와 짧은 인터뷰를 하며 메모 앱의 이름과 용도를 정하고, 그 답변이 실제 화면에 반영되는 과정을 함께 봅니다. Claude가 파일을 만들고 명령을 실행하며, 학습자는 말로 답하고 브라우저에서 GitHub 설정과 배포된 웹사이트를 확인합니다.

## 무엇을 만들까요?

- `docs/index.html`, `docs/styles.css`, `docs/app.js` 로 구성된 정적 메모 앱
- 브라우저 `localStorage`에 메모 저장
- GitHub Pages 배포
- 최종 주소: `https://<github-id>.github.io/<repo-name>/`

GitHub Pages는 정적 사이트 호스팅이라 HTML, CSS, JavaScript 파일을 그대로 배포할 수 있습니다. 이 저장소는 빌드 과정이 필요 없도록 **main branch의 docs folder**를 배포 원본으로 씁니다.

## 시작하기

Claude 데스크탑 앱의 Code 탭에서 이 폴더를 열고 다음 중 하나를 입력하세요.

- `/tutor`
- `실전 시작`
- `바로 만들자`
- `이어서 할래`

## 학습 흐름

| # | 주제 | 결과 |
|---|------|------|
| 00 | 환영 + 짧은 인터뷰 | 앱 이름, 용도, 사용자 정하기 |
| 01 | 함께 메모 앱 만들기 | 인터뷰 답변을 반영한 `docs/` 정적 앱 생성, 로컬 확인 |
| 02 | GitHub Pages 배포 | GitHub 계정 로그인, 새 저장소 생성, Pages source 설정 |
| 03 | 웹으로 확인 | `github.io` 주소 접속 확인, 마무리 |

## 명령

```bash
npm run progress
npm run check 1
npm run serve
npm run deploy:pages -- memo-pages
```

`npm run serve`는 `docs/` 폴더를 로컬 웹사이트로 띄웁니다. 배포 전 빠른 확인용입니다.

## GitHub 준비도 튜터가 안내합니다

Lesson 02에서는 GitHub 계정 준비부터 같이 갑니다.

자동 경로:

```bash
gh auth status
gh auth login --web --clipboard --git-protocol https
npm run deploy:pages -- memo-pages
```

`gh auth login`에서 멈춘 것처럼 보이면 `Ctrl+C`로 빠져나온 뒤 위처럼 `--web --clipboard --git-protocol https` 옵션을 붙여 다시 시도합니다. 그래도 막히면 튜터가 브라우저 수동 경로로 바로 이어갑니다.

`npm run deploy:pages -- memo-pages`는 GitHub CLI 로그인이 되어 있을 때 새 public 저장소를 만들고, `main` 브랜치를 push하고, GitHub Pages source를 `main / docs`로 설정합니다.

브라우저 수동 경로도 대본에 들어 있습니다. 자동 로그인이 막히면 튜터가 GitHub 화면에서 `New repository`, `Settings`, `Pages`, `Deploy from a branch`, `main`, `/docs`를 차례대로 따라 하게 안내합니다.

## 참고

이 저장소는 서버, 데이터베이스, 프레임워크 없이 갑니다. GitHub Pages에서 바로 확인하는 것이 목표라서 정적 파일만 사용합니다.
