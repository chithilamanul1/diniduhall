const fs = require('fs')
const path = require('path')

const data = {}
const dirs = ['weddings', 'catering', 'outdoor', 'general']
const publicImagesPath = path.join(__dirname, '../public/images')

for (const dir of dirs) {
  const dirPath = path.join(publicImagesPath, dir)
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i))
    data[dir] = files
  } else {
    data[dir] = []
  }
}

fs.writeFileSync(path.join(__dirname, '../gallery-data.json'), JSON.stringify(data, null, 2))
console.log('gallery-data.json generated successfully.')
