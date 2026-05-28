const fs = require('fs')
const path = require('path')

const galleryDataPath = path.join(__dirname, '../gallery-data.json')
const galleryData = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'))

const allImages = []
for (const [category, files] of Object.entries(galleryData)) {
  for (const file of files) {
    allImages.push(`/images/${category}/${file}`)
  }
}

if (allImages.length === 0) {
  console.log('No images found in gallery-data.json')
  process.exit(1)
}

function getRandomImage() {
  return allImages[Math.floor(Math.random() * allImages.length)]
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      walkDir(dirPath, callback)
    } else {
      callback(dirPath)
    }
  })
}

const appDir = path.join(__dirname, '../app')
const componentsDir = path.join(__dirname, '../components')

let replacements = 0

function processFile(filePath) {
  if (filePath.match(/\.(tsx|ts|js|jsx)$/)) {
    let content = fs.readFileSync(filePath, 'utf8')
    const regex = /\/images\/business\/[^"'\s`)]+/g
    
    let modified = false
    content = content.replace(regex, (match) => {
      replacements++
      modified = true
      return getRandomImage()
    })
    
    if (modified) {
      fs.writeFileSync(filePath, content)
      console.log(`Fixed links in ${filePath}`)
    }
  }
}

walkDir(appDir, processFile)
walkDir(componentsDir, processFile)

console.log(`Replaced ${replacements} broken image links.`)
