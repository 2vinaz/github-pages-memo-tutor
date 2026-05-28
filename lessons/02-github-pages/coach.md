# Lesson 02 — GitHub Pages 배포

목표: 메모 앱을 GitHub 저장소에 올리고 GitHub Pages가 `docs/`를 웹사이트로 배포하게 만든다.

## Step 1. Git 체크포인트 만들기 `[git]`

Claude가 실행:

```bash
git init
git add README.md CLAUDE.md package.json scripts lessons .claude .gitignore docs test
git commit -m "Create GitHub Pages memo app"
```

이미 Git 저장소라면 `git init`은 건너뛰고 나머지만 진행한다.

## Step 2. GitHub 저장소 만들기 `[repo]`

학습자에게:

> 브라우저에서 GitHub에 새 저장소를 만들어 주세요. 이름은 `memo-pages`처럼 짧게 잡으면 좋아요. 저장소를 만든 뒤 HTTPS 주소를 저에게 붙여넣어 주세요.

Claude가 주소를 받으면 실행:

```bash
git remote add origin <저장소-HTTPS-주소>
git branch -M main
git push -u origin main
```

이미 `origin`이 있으면:

```bash
git remote set-url origin <저장소-HTTPS-주소>
git push -u origin main
```

그리고 기록:

```bash
node scripts/progress.mjs github <저장소-HTTPS-주소>
node scripts/progress.mjs step 2 pages
```

## Step 3. Pages source 설정 `[pages]`

학습자에게:

> GitHub 저장소 화면에서 `Settings` → `Pages`로 가세요. `Build and deployment`에서 `Deploy from a branch`를 고르고, Branch는 `main`, Folder는 `/docs`로 선택한 뒤 저장해 주세요.

GitHub Pages가 만든 주소를 보여주면 기록:

```bash
node scripts/progress.mjs github <저장소-HTTPS-주소> <github.io-주소>
```

## Step 4. 체크 `[done]`

Claude가 실행:

```bash
npm run check 2
node scripts/progress.mjs complete 2
```

## Lesson 종료 조건

- `origin` 원격 저장소 등록
- `main` branch push 완료
- GitHub Pages source: `main / docs`
