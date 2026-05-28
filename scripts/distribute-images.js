const fs = require('fs')
const path = require('path')

const sourceDir = path.join(__dirname, '../public/images/business')
const targetDirs = {
  weddings: path.join(__dirname, '../public/images/weddings'),
  catering: path.join(__dirname, '../public/images/catering'),
  outdoor: path.join(__dirname, '../public/images/outdoor'),
  general: path.join(__dirname, '../public/images/general')
}

// Ensure target dirs exist
for (const dir of Object.values(targetDirs)) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

if (!fs.existsSync(sourceDir)) {
  console.log('Source directory does not exist.')
  process.exit(0)
}

const files = fs.readdirSync(sourceDir).filter(file => file.match(/\.(jpg|jpeg|png|webp|gif)$/i))
const categories = Object.keys(targetDirs)

let count = 0
for (const file of files) {
  const sourcePath = path.join(sourceDir, file)
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const targetDir = targetDirs[randomCategory]
  
  // Create a clean sequential name
  const ext = path.extname(file)
  const timestamp = Date.now()
  const cleanName = `${randomCategory}-${timestamp}-${count}${ext}`
  const targetPath = path.join(targetDir, cleanName)
  
  fs.renameSync(sourcePath, targetPath)
  count++
}

console.log(`Successfully distributed ${count} images into random categories.`)
