import * as fs from 'fs';
import * as path from 'path';

const STORAGE_PATH = path.resolve(process.cwd(), 'storage/state.json');

export async function saveStorageState() {
  const localStorageData = await browser.execute(() => {
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key)!;
      }
    }
    return data;
  });

  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(STORAGE_PATH, JSON.stringify(localStorageData, null, 2));
}

export async function restoreStorageState() {
    if (!fs.existsSync(STORAGE_PATH)) {
        console.warn('Storage state file not found.');
        return false; 
    }

    const storage = JSON.parse(fs.readFileSync(STORAGE_PATH, 'utf-8'));

    await browser.url('/'); 

    await browser.execute((storageData) => {
        for (const [key, value] of Object.entries(storageData)) {
        localStorage.setItem(key, value as string);
        }
    }, storage);

    await browser.refresh(); 

    return true;
}

