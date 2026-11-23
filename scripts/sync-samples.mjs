import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputDir = path.join(rootDir, 'input-samples');
const publicSamplesDir = path.join(rootDir, 'public', 'samples');
const catalogPath = path.join(rootDir, 'src', 'data', 'catalog.json');

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function syncSamples() {
  ensureDir(publicSamplesDir);

  if (!fs.existsSync(inputDir)) {
    console.log(`Папка ${inputDir} не найдена. Создаём пустую папку для сэмплов...`);
    ensureDir(inputDir);
    return;
  }

  const sampleDirs = fs.readdirSync(inputDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (sampleDirs.length === 0) {
    console.log(`Папка input-samples пуста. Ничего не синхронизировано.`);
    return;
  }

  // Загружаем текущий каталог, если есть
  let currentProducts = [];
  if (fs.existsSync(catalogPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      if (Array.isArray(existing.products)) {
        currentProducts = existing.products;
      }
    } catch (e) {
      console.warn('Не удалось прочитать существующий catalog.json, создаём новый.');
    }
  }

  const productsMap = new Map(currentProducts.map((p) => [p.id, p]));

  for (const sampleId of sampleDirs) {
    const samplePath = path.join(inputDir, sampleId);
    const metaPath = path.join(samplePath, 'meta.json');

    if (!fs.existsSync(metaPath)) {
      console.warn(`[Пропуск] В папке ${sampleId} отсутствует meta.json`);
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (err) {
      console.error(`[Ошибка] Ошибка парсинга ${metaPath}:`, err.message);
      continue;
    }

    const files = fs.readdirSync(samplePath);
    const coverFile = files.find((f) => {
      const ext = path.extname(f).toLowerCase();
      const base = path.basename(f, ext).toLowerCase();
      return base === 'cover' && ALLOWED_EXTENSIONS.includes(ext);
    });

    const targetDir = path.join(publicSamplesDir, sampleId);
    ensureDir(targetDir);

    if (coverFile) {
      const srcCover = path.join(samplePath, coverFile);
      const ext = path.extname(coverFile).toLowerCase();
      const destCover = path.join(targetDir, `cover${ext}`);
      fs.copyFileSync(srcCover, destCover);

      // Относительный путь с точкой в начале строго под github.io
      meta.image = `./samples/${sampleId}/cover${ext}`;
      console.log(`[OK] Скопировано фото для ${sampleId}: cover${ext}`);
    } else if (!meta.image) {
      meta.image = `./samples/${sampleId}/cover.jpg`;
    }

    meta.id = sampleId;
    productsMap.set(sampleId, meta);
  }

  const updatedCatalog = {
    products: Array.from(productsMap.values()),
  };

  fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2), 'utf8');
  console.log(`[Готово] Каталог обновлён: ${catalogPath} (всего товаров: ${updatedCatalog.products.length})`);
}

syncSamples().catch((err) => {
  console.error('Ошибка синхронизации:', err);
  process.exit(1);
});
