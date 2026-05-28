# Lesson 02 — GitHub Pages 배포

목표: GitHub 계정 준비부터 새 저장소 생성, GitHub Pages 설정까지 따라 하게 지원한다. 가능하면 Claude가 GitHub CLI로 자동 처리하고, 막히면 학습자가 브라우저에서 같은 흐름을 따라 한다.

## Step 1. GitHub 로그인 상태 확인 `[login]`

Claude가 실행:

```bash
gh auth status
```

성공하면:

> GitHub 로그인이 되어 있어요. 저장소 만들기와 Pages 설정은 제가 자동으로 진행할 수 있습니다.

실패하면 학습자에게:

> GitHub 계정 로그인이 아직 안 되어 있어요. 브라우저가 열리면 GitHub에 로그인만 해주세요. 비밀번호는 제가 보지 않고, GitHub 화면에서 학습자분이 직접 처리합니다.

Claude가 실행:

```bash
gh auth login
```

안내 포인트:

- `GitHub.com` 선택
- `HTTPS` 또는 기본 선택지 사용
- 브라우저가 열리면 GitHub 계정으로 로그인
- 화면에 코드 입력이 나오면 GitHub 화면에 직접 입력
- 끝나면 Claude가 다시 `gh auth status` 실행

브라우저 로그인이 계속 어렵다면 수동 경로로 간다.

## Step 2. Git 체크포인트 만들기 `[git]`

Claude가 실행:

```bash
git init
git branch -M main
git add README.md CLAUDE.md package.json scripts lessons .claude .gitignore docs test
git commit -m "Create GitHub Pages memo app"
```

이미 Git 저장소이거나 commit 할 변경이 없으면 자연스럽게 넘어간다.

## Step 3. 새 저장소 만들기 — 자동 경로 `[repo-auto]`

Claude가 학습자에게 짧게 말한다:

> 저장소 이름은 `memo-pages`로 만들게요. 이미 같은 이름이 있으면 `memo-pages-2`처럼 바꿔서 다시 시도하면 됩니다.

Claude가 실행:

```bash
npm run deploy:pages -- memo-pages
```

이 명령이 내부에서 하는 일:

```bash
gh auth status
gh repo create <GitHub계정>/memo-pages --public --source=. --remote=origin --push
gh api --method POST repos/<GitHub계정>/memo-pages/pages -f 'source[branch]=main' -f 'source[path]=/docs'
node scripts/progress.mjs github <저장소주소> <github.io주소>
```

자동 경로가 통과하면 Step 5로 간다.

## Step 4. 새 저장소 만들기 — 브라우저 수동 경로 `[repo-manual]`

자동 경로가 막히면 학습자에게:

> 괜찮아요. 같은 일을 브라우저에서 따라 하시면 됩니다. GitHub 오른쪽 위 `+` 버튼 → `New repository`를 누르세요.

학습자 행동:

1. GitHub 계정으로 로그인
2. `New repository` 선택
3. Repository name에 `memo-pages` 입력
4. `Public` 선택
5. `Add a README file`은 끈 상태로 둠
6. `Create repository` 클릭
7. 새 저장소의 HTTPS 주소를 Claude에게 붙여넣기

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
```

## Step 5. GitHub Pages 설정 — 자동 경로 `[pages-auto]`

자동 배포 스크립트가 이미 Pages를 만들었다면 Claude가 확인:

```bash
gh api repos/<GitHub계정>/<저장소이름>/pages --jq '.html_url'
```

URL이 나오면:

```bash
node scripts/progress.mjs github <저장소주소> <github.io-주소>
node scripts/progress.mjs step 2 pages
```

## Step 6. GitHub Pages 설정 — 브라우저 수동 경로 `[pages-manual]`

자동 설정이 막히면 학습자에게:

> 저장소 화면에서 `Settings` → `Pages`로 가세요. `Build and deployment`에서 `Deploy from a branch`를 고르고, Branch는 `main`, Folder는 `/docs`로 선택한 뒤 저장해 주세요.

GitHub Pages가 만든 주소를 보여주면 기록:

```bash
node scripts/progress.mjs github <저장소-HTTPS-주소> <github.io-주소>
node scripts/progress.mjs step 2 pages
```

## Step 7. 체크 `[done]`

Claude가 실행:

```bash
npm run check 2
node scripts/progress.mjs complete 2
```

통과하면 Lesson 03으로 넘어가서 웹으로 확인한다.

## Lesson 종료 조건

- GitHub 계정 로그인 확인 또는 브라우저 수동 진행 완료
- 새 저장소 생성
- `origin` 원격 저장소 등록
- `main` branch push 완료
- GitHub Pages source: `main / docs`
