#!/usr/bin/env node
import {request} from 'https'
import {readFileSync, writeFileSync} from 'fs'
const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&#quot;',
}
function escape(str) {
  let newStr = ''
  for(const char of str) newStr += char in escapeMap ? escapeMap[char] : char
  return newStr
}

function json(url) {
  return new Promise((resolve, reject) => {
    if (!process.env['GITHUB_TOKEN']) {
      return reject(new Error('GITHUB_TOKEN is not defined'))
    }

    const req = request(url, {
      headers: {
        'User-Agent': `nodejs ${process.version}`,
        'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    }, async res => {
      res.on('error', reject)
      let body = ''
      for await (const chunk of res) {
        body += chunk
      }
      resolve(JSON.parse(body))
    })
    req.on('error', reject)
    req.end()
  })
}

async function *getRepos() {
  for(let page = 1; page < 1000; page += 1) {
    const repos = await json(`https://api.github.com/orgs/github/repos?type=public&per_page=100&page=${page}`)
    if (!repos.length) return
    for (const repo of repos) {
      if (!repo.topics) continue
      if (repo.private) continue
      if (repo.fork) continue
      if (!repo.topics.includes('web-components')) continue
      if (!repo.topics.includes('custom-elements')) continue
      yield repo
    }
  }
}

let readme = readFileSync('readme.head.md', 'utf-8')
const bowerJson = JSON.parse(readFileSync('bower.json', 'utf-8'))
bowerJson.dependencies = {}
const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'))
packageJson.dependencies = {}
let repos = []
for await (const repo of getRepos()) {
  if (repo.full_name === 'github/custom-element-boilerplate') continue
  repos.push(repo)
}
repos.sort((a, b) => a.full_name.localeCompare(b.full_name))
readme += `
We have ${repos.length} open source custom elements:
`
for (const repo of repos) {
  bowerJson.dependencies[repo.name] = repo.full_name
  packageJson.dependencies[`@${repo.full_name}`] = '*'
  let exampleLink = '';
  if (repo.homepage) {
    exampleLink = ` | [Example](${repo.homepage})`
  }
  readme += `
### [${escape(repo.full_name)}](${repo.html_url})

${escape(repo.description)}

[Repository](${repo.html_url})${exampleLink}
`
}
readme += readFileSync('readme.tail.md', 'utf-8')
writeFileSync('README.md', readme)
writeFileSync('bower.json', JSON.stringify(bowerJson, null, 2))
writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

