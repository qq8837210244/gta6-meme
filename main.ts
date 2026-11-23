import * as fs from 'node:fs';
import * as path from 'node:path';

function main() {
  const rootDir = process.cwd();
  const outputDir = path.join(rootDir, 'output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const postJsonPath = path.join(rootDir, 'POST.json');
  const postContent = fs.readFileSync(postJsonPath, 'utf-8');
  fs.writeFileSync(path.join(outputDir, 'POST.json'), postContent);

  fs.copyFileSync(path.join(rootDir, 'meme.png'), path.join(outputDir, 'meme.png'));
  fs.copyFileSync(path.join(rootDir, 'meme.html'), path.join(outputDir, 'meme.html'));

  console.log('Files copied to output successfully.');
}

main();
