import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function listAllFiles(path = '') {
  const listRef = ref(storage, path);
  const res = await listAll(listRef);

  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        fullPath: itemRef.fullPath,
        url,
      };
    })
  );

  return files;
}
