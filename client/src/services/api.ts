import { DB } from "@/firebase/config";
import { SendBuyProps, SendSellProps } from "@/utils/constants";
import { format } from "date-fns";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//@ts-ignore
import idv4 from "uuid4";

export async function uploadImage(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size is larger than 5MB");
  }
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `${file?.name + idv4()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message || "error uploading image");
  }
}
export async function uploadManyImages(files: File[]) {
  const uploadPromises = [...files].map(async file => {
    return await uploadImage(file);
  });
  try {
    const photos: string[] = await Promise.all(uploadPromises);
    return photos;
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message || "error uploading images");
  }
}

export async function sendBuyRequest({
  email,
  fullName,
  entreprise,
  sector,
  equipments,
  message,
  phone,
}: SendBuyProps) {
  const date = format(new Date(), "dd LLLL yyyy");
  const data = {
    entreprise,
    email,
    fullName,
    sector,
    phone,
    message,
    date,
    equipments,
    timestamp: new Date(),
  };

  try {
    await addDoc(collection(DB, "buy-requests"), data);
  } catch (error) {
    throw new Error(
      //@ts-ignore
      error?.message || "we couldn't send your request at the moment"
    );
  }
}
export async function sendSellRequest({
  email,
  fullName,
  productName,
  details,
  photosFiles,
  phone,
  price,
}: SendSellProps) {
  const date = format(new Date(), "dd LLLL yyyy");
  const data = {
    productName,
    email,
    fullName,
    details,
    phone,
    price,
    date,
    photos: [],
    timestamp: new Date(),
  };

  try {
    const photos = await uploadManyImages(photosFiles);
    //@ts-ignore
    data.photos = photos;
    await addDoc(collection(DB, "sell-requests"), data);
  } catch (error) {
    throw new Error(
      //@ts-ignore
      error?.message || "we couldn't send your request at the moment"
    );
  }
}

export async function getEquipments() {
  try {
    const res = await getDocs(collection(DB, "equipments"));
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message);
  }
}
export async function getLayout() {
  try {
    const res = await getDocs(collection(DB, "layout"));
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message);
  }
}