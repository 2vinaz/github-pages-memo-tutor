#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const progressPath = resolve(process.cwd(), '.progress.json')

function read() {
  if (!existsSync(progressPath)) return null
  try {
    return JSON.parse(readFileSync(progressPath, 'utf8'))
  } catch {
    return null
  }
}

function write(data) {
  writeFileSync(progressPath, JSON.stringify(data, null, 2) + '\n')
}

function init() {
  const data = {
    learner: {
      mode: 'practical',
      createdAt: new Date().toISOString(),
    },
    currentLesson: 0,
    currentStep: 'step1',
    completed: [],
    lessons: {},
    github: {
      repositoryUrl: null,
      pagesUrl: null,
    },
  }
  write(data)
  return data
}

function ensure() {
  return read() ?? init()
}

function step(lesson, stepKey) {
  const data = ensure()
  data.currentLesson = Number(lesson)
  data.currentStep = stepKey
  write(data)
  return data
}

function check(lesson, key, value) {
  const data = ensure()
  const id = String(lesson)
  data.lessons[id] ??= {}
  data.lessons[id].checks ??= {}
  data.lessons[id].checks[key] = value
  write(data)
  return data
}

function complete(lesson) {
  const data = ensure()
  const n = Number(lesson)
  if (!data.completed.includes(n)) data.completed.push(n)
  data.lessons[String(n)] ??= {}
  data.lessons[String(n)].completedAt = new Date().toISOString()
  data.currentLesson = n + 1
  data.currentStep = 'step1'
  write(data)
  return data
}

function github(repositoryUrl, pagesUrl) {
  const data = ensure()
  data.github.repositoryUrl = repositoryUrl ?? data.github.repositoryUrl
  data.github.pagesUrl = pagesUrl ?? data.github.pagesUrl
  write(data)
  return data
}

const [cmd, ...args] = process.argv.slice(2)

try {
  switch (cmd) {
    case 'show':
      console.log(JSON.stringify(read(), null, 2))
      break
    case 'init':
      console.log(JSON.stringify(init(), null, 2))
      break
    case 'reset':
      console.log(JSON.stringify(init(), null, 2))
      break
    case 'step':
      console.log(JSON.stringify(step(args[0], args[1]), null, 2))
      break
    case 'check':
      console.log(JSON.stringify(check(args[0], args[1], args[2]), null, 2))
      break
    case 'complete':
      console.log(JSON.stringify(complete(args[0]), null, 2))
      break
    case 'github':
      console.log(JSON.stringify(github(args[0], args[1]), null, 2))
      break
    default:
      console.error(`Usage:
  progress.mjs show
  progress.mjs init
  progress.mjs reset
  progress.mjs step <lesson> <step>
  progress.mjs check <lesson> <key> <value>
  progress.mjs complete <lesson>
  progress.mjs github <repositoryUrl> [pagesUrl]`)
      process.exit(2)
  }
} catch (error) {
  console.error(`Error: ${error.message}`)
  process.exit(1)
}
