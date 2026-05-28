const fs = require('fs')
const path = require('path')

const appDir = path.join(__dirname, '../app')
const componentsDir = path.join(__dirname, '../components')

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f)
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback)
    } else {
      callback(dirPath)
    }
  })
}

let count = 0
function processFile(filePath) {
  if (filePath.match(/\.(tsx|ts|js|jsx)$/)) {
    let content = fs.readFileSync(filePath, 'utf8')
    const regex = / \(\d+\)\.(jpeg|jpg|png|webp|gif)/g
    if (content.match(regex)) {
      content = content.replace(regex, '')
      fs.writeFileSync(filePath, content)
      console.log(`Fixed double extensions in ${filePath}`)
      count++
    }
  }
}

walkDir(appDir, processFile)
walkDir(componentsDir, processFile)
console.log(`Fixed ${count} files.`)
