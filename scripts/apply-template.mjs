#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const src = resolve(root, 'lessons/01-build-memo/template/docs')
const dest = resolve(root, 'docs')

rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })

console.log('docs/ 메모 앱 파일을 만들었어요.')
