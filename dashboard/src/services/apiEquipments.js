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
import { format } from "date-fns";
export const createdAt = format(new Date(), "dd LLLL yyyy");
const collectionRef = collection(DB, "equipments");

export async function deleteMultipleImages(imagePaths) {
  const storage = getStorage();

  const deletePromises = imagePaths.map(path => {
    const imageRef = ref(storage, path);
    return deleteObject(imageRef).catch(error => {
      console.log(`Failed to delete ${path} : ${error.message}`);
      return null;
    });
  });

  try {
    await Promise.all(deletePromises);
  } catch (error) {
    throw new Error(error?.message || "Error deleting one or more images");
  }
}

export async function uploadImage(file) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size is larger than 5MB");
  }

  try {
    const storage = getStorage();
    const storageRef = ref(storage, idv4());
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });
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
  id,
  name,
  isFeatured,
  brochure,
  isActive,
  category,
  subcategory,
  subsubcategory,
  brand,
  description,
  stock,
  condition,
  imagesApi,
  imageFiles,
}) {
  const imagesToDelete = imagesApi?.filter(item => item.delete);
  try {
    const data = {
      name,
      isFeatured,
      isActive,
      category,
      subcategory,
      subsubcategory,
      brand,
      description,
      stock,
      condition,
    };
    if (imagesToDelete.length > 0) {
      await deleteMultipleImages(imagesToDelete.map(item => item.image));
    }
    let newImages = [];
    if (imageFiles.length) {
      newImages = await Promise.all(
        imageFiles.map(item => uploadImage(item.file))
      );
    }
    data.images = [
      ...imagesApi.filter(item => !item.delete).map(item => item.image),
      ...newImages,
    ];
    if (!imageFiles.length && !imagesApi.filter(item => !item.delete).length) {
      throw new Error("Please upload some images");
    }

    if (brochure) {
      const brochurePdf = await uploadImage(brochure);
      data.brochure = brochurePdf;
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
  isFeatured = false,
  category,
  brochure,
  subcategory,
  subsubcategory,
  brand,
  description,
  stock,
  imageFiles,
  condition,
}) {
  if (!imageFiles.length) throw new Error("Please uplod some images");

  const images = await Promise.all(
    imageFiles.map(item => item.file).map(file => uploadImage(file))
  );

  const data = {
    name,
    images,
    description,
    isActive: true,
    category,
    isFeatured,
    subcategory,
    subsubcategory,
    brand,
    stock,
    condition,
    createdAt,
    timestamp: new Date(),
  };
  if (brochure) {
    const brochurePdf = await uploadImage(brochure);
    data.brochure = brochurePdf;
  }

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
export async function getCategories() {
  try {
    const res = await getDocs(collection(DB, "categories"));
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data[0].categories;
  } catch (error) {
    throw new Error(error?.message);
  }
}
export async function updateCategories(newData) {
  try {
    await updateDoc(doc(DB, "categories", "global-categories"), {
      categories: newData,
    });
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
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
