import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function exportJson() {
  console.log('📦 Loading TypeScript database via Vite SSR loader...');
  const vite = await createServer({
    root: rootDir,
    server: { middlewareMode: true }
  });

  try {
    const module = await vite.ssrLoadModule('./src/data/shoesData.ts');
    const shoes = module.INITIAL_SHOES_DATA;

    if (!shoes || !Array.isArray(shoes)) {
      throw new Error('Failed to load INITIAL_SHOES_DATA from shoesData.ts');
    }

    const outputDir = path.join(rootDir, 'public', 'data');
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'shoes.json');
    fs.writeFileSync(outputPath, JSON.stringify(shoes, null, 2), 'utf8');
    console.log(`✅ Single Source of Truth: Successfully exported ${shoes.length} footwear models to public/data/shoes.json`);
  } catch (err) {
    console.error('❌ Error exporting shoes.json:', err);
    process.exit(1);
  } finally {
    await vite.close();
  }
}

exportJson();
