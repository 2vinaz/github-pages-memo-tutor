# Lesson 01 — 제품 인터뷰 답변으로 메모 앱 함께 만들기

목표: Lesson 00에서 정한 `What`, `Who`, `Behavior`, `Errors`, `Out of Scope`, `Design` 답변을 제품 기획 요약과 화면 디자인에 반영한 정적 메모 앱을 만든다.

## Step 1. 제품 기획 요약 확인 `[review]`

Claude가 `.progress.json`을 읽고 Lesson 00 인터뷰 답변을 확인한다.

학습자에게:

> 아까 함께 정한 인터뷰 답변을 제품 기획 요약으로 화면에 넣어볼게요.
>
> - What: `<what>`
> - Who: `<who>`
> - Behavior: `<behavior>`
> - Errors: `<errors>`
> - Out of Scope: `<outOfScope>`
> - Design: `<design>`
>
> 이제 이 내용이 제목, 제품 기획 요약, 안내 문구, 디자인 방향에 반영됩니다.

실행:

```bash
node scripts/progress.mjs step 1 review
```

## Step 2. 기본 파일 만들기 `[create]`

Claude가 실행:

```bash
node scripts/apply-template.mjs
```

학습자에게:

> 먼저 기본 뼈대를 만들었어요. 아직은 기본 메모 앱이고, 다음 단계에서 함께 정한 제품 방향과 디자인을 입힙니다.

## Step 3. 제품 내용과 디자인 적용 `[customize]`

Claude가 실행:

```bash
node scripts/customize-app.mjs
```

학습자에게:

> 이제 인터뷰 답변을 반영했습니다. What은 제목과 핵심 설명에, Who/Behavior/Errors/Out of Scope는 제품 기획 요약에, Design은 색상과 카드 톤에 반영했어요.

실행:

```bash
node scripts/progress.mjs step 1 customize
```

## Step 4. 로컬에서 확인 `[local]`

Claude가 실행:

```bash
npm run serve
```

학습자에게:

> 브라우저에서 `http://localhost:4173`을 열어보세요. `localhost`는 지금 이 튜터가 실행 중인 컴퓨터 안에서만 열리는 주소입니다. 포트가 이미 켜져 있다고 나오면 기존 미리보기 서버를 그대로 쓰면 됩니다.
>
> 확인할 것은 세 가지예요: 제품 기획 요약이 보이는지, Design 답변과 어울리는 화면 톤인지, 메모를 하나 저장하고 새로고침해도 남아있는지입니다.

확인되면:

```bash
node scripts/progress.mjs step 1 local
```

## Step 5. 짧은 풀이 `[explain]`

학습자에게:

> 지금 한 일은 코딩 전에 정한 제품 기준을 화면에 연결한 것입니다. What/Who/Behavior/Errors/Out of Scope는 기능 범위를 흔들리지 않게 잡아주고, Design은 사용자가 처음 보는 느낌을 결정합니다. 앱 자체는 서버 없이 브라우저 안에 저장되는 정적 메모 앱이라 GitHub Pages에 그대로 올릴 수 있어요.

## Step 6. 체크 `[done]`

Claude가 실행:

```bash
npm run check 1
node scripts/progress.mjs complete 1
```

통과하면 Lesson 02로 넘어간다.

## Lesson 종료 조건

- 인터뷰 답변 확인
- `docs/index.html`
- `docs/styles.css`
- `docs/app.js`
- 제품 기획 요약 반영
- 디자인 방향 반영
- 로컬 브라우저에서 메모 저장 확인
