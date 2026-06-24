// IndexedDB utility for persistent photo and custom music storage
const DB_NAME = 'NaemaSurpriseDB';
const DB_VERSION = 1;
const PHOTO_STORE = 'photos';
const SETTINGS_STORE = 'settings';

export interface SavedPhoto {
  id: string;
  name: string;
  dataUrl: string; // base64 data
  addedAt: number;
}

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' });
      }
    };
  });
}

export async function savePhoto(photo: SavedPhoto): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PHOTO_STORE, 'readwrite');
    const store = transaction.objectStore(PHOTO_STORE);
    const request = store.put(photo);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAllPhotos(): Promise<SavedPhoto[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PHOTO_STORE, 'readonly');
    const store = transaction.objectStore(PHOTO_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      // Sort by addedAt to maintain sequence
      const photos = request.result as SavedPhoto[];
      photos.sort((a, b) => a.addedAt - b.addedAt);
      resolve(photos);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deletePhoto(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PHOTO_STORE, 'readwrite');
    const store = transaction.objectStore(PHOTO_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveSetting(key: string, value: any): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.put({ id: key, value });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getSetting<T>(key: string): Promise<T | null> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readonly');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.get(key);

    request.onsuccess = () => {
      resolve(request.result ? (request.result.value as T) : null);
    };
    request.onerror = () => reject(request.error);
  });
}
