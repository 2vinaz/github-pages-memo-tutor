#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const lesson = process.argv[2]

if (lesson === undefined) {
  console.error('Usage: npm run check <레슨번호>')
  process.exit(2)
}

const padded = String(lesson).padStart(2, '0')
const lessonsDir = resolve(process.cwd(), 'lessons')
const folder = readdirSync(lessonsDir).find((entry) => entry.startsWith(`${padded}-`))

if (!folder) {
  console.error(`레슨 ${padded} 폴더를 찾을 수 없어요.`)
  process.exit(1)
}

const checkPath = resolve(lessonsDir, folder, 'check.mjs')

if (!existsSync(checkPath)) {
  console.error(`${checkPath} 파일이 없어요.`)
  process.exit(1)
}

const result = spawnSync('node', [checkPath], { stdio: 'inherit' })
process.exit(result.status ?? 1)
