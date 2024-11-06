import { storage } from "@/firebase.config";
import { ref, listAll, getDownloadURL } from "firebase/storage";


export const fetchImages = async (folderPath: string): Promise<string[]> => {
  const imagesDB = ref(storage, folderPath);
  const imageList = await listAll(imagesDB);
  const imageUrls = await Promise.all(
    imageList.items.map((item) => getDownloadURL(item))
  );
  return imageUrls;
};

