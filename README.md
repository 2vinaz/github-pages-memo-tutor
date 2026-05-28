# github-pages-memo-tutor

GitHub Pages에 바로 올라가는 메모 앱을 만드는 실전형 튜터 저장소입니다.

학습자는 긴 개념 설명이나 사전 질문 없이 Claude 데스크탑 앱에서 바로 실습을 시작합니다. Claude가 파일을 만들고 명령을 실행하며, 학습자는 브라우저에서 GitHub 설정과 배포된 웹사이트만 확인합니다.

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
| 00 | 바로 시작 | 진행 파일 만들고 실습 방식 고정 |
| 01 | 메모 앱 만들기 | `docs/` 정적 앱 생성, 로컬 확인 |
| 02 | GitHub Pages 배포 | GitHub 저장소 push, Pages source 설정 |
| 03 | 웹으로 확인 | `github.io` 주소 접속 확인, 마무리 |

## 명령

```bash
npm run progress
npm run check 1
npm run serve
```

`npm run serve`는 `docs/` 폴더를 로컬 웹사이트로 띄웁니다. 배포 전 빠른 확인용입니다.

## 참고

이 저장소는 서버, 데이터베이스, 프레임워크 없이 갑니다. GitHub Pages에서 바로 확인하는 것이 목표라서 정적 파일만 사용합니다.
