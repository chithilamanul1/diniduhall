const fs = require('fs');
const path = require('path');
const rootDir = process.cwd();

function write(filePath, content) {
    const fullPath = path.join(rootDir, filePath);
    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ FIXED: ${filePath}`);
}

console.log("🚀 INJECTING MISSING AUTOPREFIXER...");

// READ PACKAGE.JSON
const pkgPath = path.join(rootDir, 'package.json');
const pkg = require(pkgPath);

// ADD MISSING DEPENDENCY
if (!pkg.devDependencies) pkg.devDependencies = {};
pkg.devDependencies["autoprefixer"] = "^10.4.17";

// WRITE BACK
write('package.json', JSON.stringify(pkg, null, 2));

console.log("✅ AUTOPREFIXER ADDED.");
console.log("👉 ACTION: git add . && git commit -m 'Add missing autoprefixer' && git push");