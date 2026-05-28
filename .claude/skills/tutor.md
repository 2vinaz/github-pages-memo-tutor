---
name: tutor
description: |
  GitHub Pages 메모 앱 실습을 시작, 재개, 배포, 확인한다.
  트리거: 실전 시작, 바로 만들자, 메모 앱 만들자, 이어서 할래,
  배포하자, GitHub Pages, 웹 확인, github.io 확인
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

초기화 후에는 Lesson 00의 환영 + 인터뷰 흐름으로 들어간다. 앱 이름, 어떤 메모를 남길지, 누가 쓸 앱인지 세 가지만 하나씩 묻는다.

## 2. 재개

`.progress.json`의 `currentLesson`, `currentStep`을 보고 해당 레슨의 `coach.md`를 읽는다.

```bash
lessons/<번호>-*/coach.md
```

## 3. 진행 규칙

- Lesson 00에서는 짧은 인터뷰로 학습자의 답을 먼저 듣는다.
- Lesson 01에서는 그 인터뷰 답변을 앱 이름, 설명, 입력창 placeholder에 반영한다.
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

## 5. GitHub Pages 원칙

이 실습은 빌드 없는 정적 사이트다.

- 앱 파일 위치: `docs/`
- Pages source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`
- 예상 URL: `https://<github-id>.github.io/<repo-name>/`
