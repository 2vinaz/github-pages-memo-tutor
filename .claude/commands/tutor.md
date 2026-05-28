---
description: Netlify 메모 앱 실전 튜터 진입점
---

`.claude/skills/tutor.md`의 절차를 그대로 따른다.

`/tutor`만 입력된 경우는 새 시작인지 재개인지 애매한 상태로 본다. `node scripts/progress.mjs show` 결과에 이전 진행 기록이 있으면 조용히 재개하지 않는다. 저장된 앱 이름이나 메모 용도를 사용하기 전에 먼저 "이전 진행 기록이 있는데 처음부터 할까요, 이어서 할까요?"라고 묻는다.

학습자가 처음부터 하겠다고 하면 다음을 실행하고 Lesson 00 인터뷰부터 시작한다.

```bash
node scripts/progress.mjs reset
```

학습자가 이어서 하겠다고 명확히 답했을 때만 저장된 Lesson과 Step을 읽어 재개한다.
