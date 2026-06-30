const fs = require('fs')
const matter = require('gray-matter')
const p = process.argv[2]
if (!p) {
  console.error('Usage: node parse-frontmatter.js <path>')
  process.exit(2)
}
let s = fs.readFileSync(p, 'utf8')
if (s.startsWith('```')) {
  s = s.replace(/^```[^\n]*\n/, '')
}
const parsed = matter(s)
console.log(JSON.stringify(parsed.data, null, 2))
