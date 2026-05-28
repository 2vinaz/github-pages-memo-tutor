# Product Interview And Design Tutor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the tutor so learners define a small app through What, Who, Behavior, Errors, Out of Scope, and Design interviews before implementation.

**Architecture:** Keep the existing four-lesson structure. Lesson 00 collects richer product/design answers into `.progress.json`; Lesson 01 summarizes those answers and applies them to the static memo app through `scripts/customize-app.mjs`.

**Tech Stack:** Node.js scripts, Notion-free Markdown tutor guides, static HTML/CSS/JavaScript, `node:test`.

---

### Task 1: Lock Interview Requirements With Tests

**Files:**
- Modify: `test/repository.test.mjs`
- Modify: `test/customize-app.test.mjs`

- [ ] Add assertions that Lesson 00 asks for `what`, `who`, `behavior`, `errors`, `outOfScope`, and `design`.
- [ ] Add assertions that Lesson 01 summarizes the product brief and runs a design pass.
- [ ] Add customization assertions that the generated app includes the What/Who/Behavior/Error/Out-of-Scope text and design-driven CSS tokens.
- [ ] Run `npm test` and verify the new assertions fail before implementation.

### Task 2: Expand Lesson 00 Into Product Interview

**Files:**
- Modify: `lessons/00-start/coach.md`
- Modify: `lessons/00-start/check.mjs`
- Modify: `CLAUDE.md`
- Modify: `.claude/skills/tutor.md`

- [ ] Replace the three-question interview with six product questions: What, Who, Behavior, Errors, Out of Scope, Design.
- [ ] Store answers with `node scripts/progress.mjs check 0 <key> "<answer>"`.
- [ ] Require the six new keys in Lesson 00 check.
- [ ] Update top-level tutor rules so design preference is a first-class interview answer.

### Task 3: Apply Product And Design Answers

**Files:**
- Modify: `scripts/customize-app.mjs`
- Modify: `lessons/01-build-memo/coach.md`
- Modify: `lessons/01-build-memo/check.mjs`

- [ ] Read new Lesson 00 keys from `.progress.json`.
- [ ] Render a product brief block into `docs/index.html`.
- [ ] Use `design` text to select a simple visual theme: calm/minimal, bright/friendly, or focused/professional.
- [ ] Keep the app static and Netlify-compatible.
- [ ] Check that required answers appear in the generated HTML.

### Task 4: Verify And Ship

**Files:**
- Modify only files from Tasks 1-3.

- [ ] Run `npm test`.
- [ ] Run `npm run check 0` after seeding progress answers.
- [ ] Run a temporary Lesson 01 customization check.
- [ ] Commit and push.
- [ ] Confirm the deployed `netlify.app` URL responds.
