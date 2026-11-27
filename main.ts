import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function verifyDirectoryPresent(dirPath: string, label: string): void {
  if (!existsSync(dirPath) || !statSync(dirPath).isDirectory()) {
    throw new Error(`Missing required ${label} directory at ${dirPath}`);
  }
}

function stageStaticPortal(): void {
  const sourceApp = join(repoRoot, 'app');
  const sourceShots = join(repoRoot, 'screenshots');
  verifyDirectoryPresent(sourceApp, 'app');

  mkdirSync(outputDir, { recursive: true });
  cpSync(sourceApp, join(outputDir, 'app'), { recursive: true });

  const targetShots = join(outputDir, 'screenshots');
  mkdirSync(targetShots, { recursive: true });
  if (existsSync(sourceShots)) {
    const validShots = readdirSync(sourceShots).filter((name) => !name.startsWith('.')).sort();
    for (const fileName of validShots) {
      cpSync(join(sourceShots, fileName), join(targetShots, fileName));
    }
  }

  const dossierPayload = buildDossier(outputDir, DOSSIER_LIMITS);
  const dossierPath = join(outputDir, 'dossier.json');
  writeFileSync(dossierPath, dossierPayload);
}

stageStaticPortal();
