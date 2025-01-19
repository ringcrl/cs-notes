const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const https = require('https');
const crypto = require('crypto');

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function processMarkdown(inputFile) {
  const outputDir = path.join(path.dirname(inputFile), 'output');
  const outputImagesDir = path.join(outputDir, 'images');
  
  await fsPromises.mkdir(outputDir, { recursive: true });
  await fsPromises.mkdir(outputImagesDir, { recursive: true });

  const content = await fsPromises.readFile(inputFile, 'utf-8');
  const imageRegex = /!\[.*?\]\((https?:\/\/[^)]+)\)/g;
  let newContent = content;
  const matches = content.matchAll(imageRegex);

  for (const match of matches) {
    const imageUrl = match[1];
    const urlHash = crypto.createHash('md5').update(imageUrl).digest('hex');
    const extension = path.extname(imageUrl) || '.jpg';
    const localFileName = `${urlHash}${extension}`;
    const localFilePath = path.join(outputImagesDir, localFileName);
    
    try {
      await downloadImage(imageUrl, localFilePath);
      const relativePath = path.join('images', localFileName);
      newContent = newContent.replace(imageUrl, relativePath);
    } catch (err) {
      console.error(`Failed to process ${imageUrl}:`, err);
    }
  }

  const newFileName = path.basename(inputFile, '.md') + '_processed.md';
  const outputPath = path.join(outputDir, newFileName);
  await fsPromises.writeFile(outputPath, newContent, 'utf-8');
}

async function main() {
  const mdFiles = await fsPromises.readdir('.');
  for (const file of mdFiles) {
    if (file.endsWith('.md')) {
      console.log(`Processing ${file}...`);
      await processMarkdown(file);
      console.log(`Completed processing ${file}`);
    }
  }
}

main().catch(console.error);