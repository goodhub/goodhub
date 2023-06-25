// @ts-check
import { rmSync, statSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const dummy = `// This file is intentionally left blank.`;

const paths = readdirSync('node_modules/@pulumi/azure-native');
for (const path of paths) {
  const resolvedPath = join('node_modules/@pulumi/azure-native', path);
  if (!statSync(resolvedPath).isDirectory()) continue;
  const subfolders = readdirSync(resolvedPath);
  for (const subfolder of subfolders) {
    if (statSync(resolvedPath).isDirectory() && subfolder.startsWith('v2')) {
      const folderPath = join(resolvedPath, subfolder);
      console.log('Removing...', folderPath);
      rmSync(folderPath, { recursive: true, force: true });
      mkdirSync(folderPath);
      writeFileSync(join(folderPath, 'index.js'), dummy);
    }
  }
}
