---
name: tutor
description: |
  Netlify CLI 메모 앱 실습을 시작, 재개, 배포, 확인한다.
  트리거: 실전 시작, 바로 만들자, 메모 앱 만들자, 이어서 할래,
  배포하자, Netlify, 웹 확인, netlify.app 확인
---

# /tutor 진행 절차

## 1. 진도 확인

먼저 실행한다.

```bash
node scripts/progress.mjs show
```

파일이 없으면 곧바로 초기화한다.

```bash
node scripts/progress.mjs init
```

이전 진행 기록이 있으면 새 학습자의 답변처럼 읽지 않는다. 특히 저장된 앱 이름, 메모 용도, 사용자 정보를 학습자가 방금 말한 것처럼 말하며 조용히 Lesson 01로 넘어가지 않는다.

학습자가 `실전 시작`, `바로 만들자`, `처음부터`, `새로 할래`처럼 새 실습 의도를 보이면 말한다.

> 이 폴더에 이전 진행 기록이 있어요. 새 실습으로 시작할 수 있게 초기화하고 Lesson 00 인터뷰부터 갈게요.

그다음 실행한다.

```bash
node scripts/progress.mjs reset
```

학습자가 `이어서 할래`, `계속`, `배포하자`, `웹 확인`처럼 재개 의도를 분명히 말했을 때만 저장된 진도를 이어간다. 의도가 애매하면 "이전 진행 기록이 있는데 이어서 할까요, 처음부터 할까요?"라고 한 번만 확인한다.

초기화 후에는 Lesson 00의 환영 + 제품 인터뷰 흐름으로 들어간다. `What`, `Who`, `Behavior`, `Errors`, `Out of Scope`, `Design`을 하나씩 묻는다. 디자인 답변은 Lesson 01에서 색상, 여백, 카드 톤에 반영한다.

## 2. 재개

`.progress.json`의 `currentLesson`, `currentStep`을 보고 해당 레슨의 `coach.md`를 읽는다.

```bash
lessons/<번호>-*/coach.md
```

## 3. 진행 규칙

- Lesson 00에서는 제품 인터뷰로 학습자의 답을 먼저 듣는다.
- Lesson 01에서는 그 인터뷰 답변을 제품 기획 요약, 안내 문구, 입력창 placeholder, 디자인 방향에 반영한다.
- Design 답변을 받으면 디자인 스킬이 발동된 것처럼 색상, 여백, 화면 밀도, 카드 톤을 선택하고 `docs/styles.css`에 반영한다.
- 파일 생성과 명령 실행은 Claude가 한다.
- 학습자에게는 브라우저에서 확인해야 하는 행동만 짧게 요청한다.
- Step 종료 시 다음을 실행한다.

```bash
node scripts/progress.mjs step <lesson> <step>
```

## 4. 레슨 완료

각 레슨 마지막에 Claude가 직접 체크한다.

```bash
npm run check <lesson>
```

통과하면:

```bash
node scripts/progress.mjs complete <lesson>
```

## 5. Netlify CLI 배포 원칙

이 실습은 빌드 없는 정적 사이트다.

- 앱 파일 위치: `docs/`
- 배포 명령: `npm run deploy:netlify`
- 내부 CLI: `npx --yes netlify-cli@latest deploy --allow-anonymous --dir docs --no-build --json`
- 예상 URL: `https://<임시이름>.netlify.app/`
- 기본 경로에서는 별도 서비스 로그인, 저장소 생성, 토큰 입력을 요구하지 않는다.
- 배포 URL은 공개 주소이므로 실습용 문구만 올리고 민감한 내용은 넣지 않는다.
