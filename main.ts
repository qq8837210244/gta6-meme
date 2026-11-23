import { accessSync, constants, copyFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { env, exit } from 'node:process';

function main(): void {
  const botDir: string = env.MAKEFUN_BOT_DIR || '/bot';
  const outputDir: string = env.MAKEFUN_OUTPUT_DIR || '/output';

  const sourcePath: string = join(botDir, 'POST.json');
  const targetPath: string = join(outputDir, 'POST.json');

  try {
    accessSync(sourcePath, constants.R_OK);
    mkdirSync(outputDir, { recursive: true });

    if (resolve(sourcePath) !== resolve(targetPath)) {
      copyFileSync(sourcePath, targetPath);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Failed to copy POST.json from ${sourcePath} to ${targetPath}: ${message}`);
    exit(1);
  }
}

main();
