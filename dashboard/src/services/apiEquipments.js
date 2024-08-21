import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  writeBatch,
  setDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import idv4 from "uuid4";

import { DB } from "../firebase/config";
import { differenceInDays, format } from "date-fns";
export const createdAt = format(new Date(), "dd LLLL yyyy");
const collectionRef = collection(DB, "equipments");

export async function deleteMultipleImages(imagePaths) {
  const storage = getStorage();

  const deletePromises = imagePaths.map(path => {
    const imageRef = ref(storage, path);
    return deleteObject(imageRef).catch(error => {
      throw new Error(`Failed to delete ${path} : ${error.message}`);
    });
  });

  try {
    await Promise.all(deletePromises);
  } catch (error) {
    throw new Error("Error deleting one or more images");
  }
}

export async function uploadImage(file) {
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
    throw new Error(error?.message || "error uploading image");
  }
}

export async function getEquipments() {
  try {
    const res = await getDocs(
      query(collection(DB, "equipments"), orderBy("timestamp", "desc"))
    );
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function getBuyEquipments() {
  try {
    const res = await getDocs(
      query(collection(DB, "buy-requests"), orderBy("timestamp", "desc"))
    );
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function getSellEquipments() {
  try {
    const res = await getDocs(
      query(collection(DB, "sell-requests"), orderBy("timestamp", "desc"))
    );
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function deleteEquipment(id) {
  try {
    await deleteDoc(doc(DB, "equipments", id));
  } catch (error) {
    throw new Error("error deleting equipment : " + error?.message);
  }
}
export async function updateEquipmentApi({
  newEquipmentData,
  oldImage,
  newImage,
  id,
}) {
  try {
    const data = { ...newEquipmentData };

    if (newImage) {
      const url = await uploadImage(newImage);
      await deleteMultipleImages([oldImage]);
      data.image = url;
    }

    const ref = doc(DB, "equipments", id);
    await updateDoc(ref, data);
  } catch (error) {
    throw new Error("error updating equipment : " + error?.message);
  }
}
export async function deleteSellRequestApi(id) {
  try {
    await deleteDoc(doc(DB, "sell-requests", id));
  } catch (error) {
    throw new Error("error deleting request : " + error?.message);
  }
}
export async function deleteBuyRequestApi(id) {
  try {
    await deleteDoc(doc(DB, "buy-requests", id));
  } catch (error) {
    throw new Error("error deleting request : " + error?.message);
  }
}
export async function addEquipment({
  name,
  description,
  imageFile,
  category,
  isFeatured = false,
  stock,
}) {
  const image = await uploadImage(imageFile);
  const data = {
    name,
    image,
    description,
    isActive: true,
    category,
    isFeatured,
    stock,
    createdAt,
    timestamp: new Date(),
  };

  try {
    await addDoc(collectionRef, data);
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function updateLayout({
  partnersImagesFiles = [],
  partnersToDelete = [],
  newBannerFile = null,
}) {
  if (newBannerFile) {
    try {
      const image = await uploadImage(newBannerFile);
      const data = {
        image,
        type: "banner",
      };
      const docRef = doc(DB, "layout", "banner-1");
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      throw new Error("error updating banner : " + error?.message);
    }
  }
  if (partnersToDelete.length) {
    await deleteMultipleImages(partnersToDelete.map(item => item.image));
    const batch = writeBatch(DB);
    partnersToDelete
      .map(item => item.id)
      .forEach(id => {
        const docRef = doc(DB, "layout", id);
        batch.delete(docRef);
      });

    try {
      await batch.commit();
    } catch (error) {
      throw new Error("Error deleting partners : " + error?.message);
    }
  }
  if (partnersImagesFiles.length) {
    const batch = writeBatch(DB);
    const uploadPromises = partnersImagesFiles.map(uploadImage);

    try {
      const partnersUrls = await Promise.all(uploadPromises);
      partnersUrls.forEach(imageUrl => {
        const rowData = {
          image: imageUrl,
          type: "partner",
        };
        const docRef = doc(collection(DB, "layout"));
        batch.set(docRef, rowData);
      });
      await batch.commit();
    } catch (error) {
      throw new Error("we couldnt upload partner images : " + error?.message);
    }
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
    throw new Error(error?.message);
  }
}

export async function getMessages() {
  try {
    const res = await getDocs(
      query(collection(DB, "messages"), orderBy("timestamp", "desc"))
    );
    const data = res.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function deleteMessage(id) {
  try {
    await deleteDoc(doc(DB, "messages", id));
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function markMessageAsSeen(id) {
  try {
    await updateDoc(doc(DB, "messages", id), { seen: true });
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function getAnalytics() {
  try {
    const res = await getDocs(collection(DB, "analytics"));
    const data = res.forEach(data => ({ id: data.id, ...data.data() }));
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
