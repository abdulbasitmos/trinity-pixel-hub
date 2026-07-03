const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

const source = path.join(__dirname, 'trinity-pixel-hub', 'dist');
const destination = path.join(__dirname, 'dist');

try {
  console.log(`Copying build outputs from ${source} to ${destination}...`);
  if (fs.existsSync(destination)) {
    fs.rmSync(destination, { recursive: true, force: true });
  }
  copyFolderSync(source, destination);

  // Copy vercel.json to root dist and source dist to ensure edge routing is fully initialized
  const rootVercelJson = path.join(__dirname, 'vercel.json');
  if (fs.existsSync(rootVercelJson)) {
    fs.copyFileSync(rootVercelJson, path.join(destination, 'vercel.json'));
    fs.copyFileSync(rootVercelJson, path.join(source, 'vercel.json'));
    console.log('vercel.json successfully copied to output directories!');
  }

  console.log('Build outputs successfully copied to root directory!');
} catch (err) {
  console.error('Failed to copy build outputs:', err);
  process.exit(1);
}
