import { DB } from "@/firebase/config";
import {
  EMAILJS_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE,
  SendBuyProps,
  SendSellProps,
} from "@/utils/constants";
import { getCountry } from "@/utils/helpers";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
//@ts-ignore
import idv4 from "uuid4";
export const createdAt = () => format(new Date(), "dd LLLL yyyy");
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
    country: getCountry(),
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
  await senEmail({ request_name: "Buy", from_name: fullName });
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
    country: getCountry(),
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
  await senEmail({ request_name: "Sell", from_name: fullName });
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
export async function getCategories() {
  try {
    const res = await getDocs(collection(DB, "categories"));
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data[0].categories;
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message);
  }
}

//@ts-ignore
export async function addPageView(country) {
  const dataViews = await getDocs(collection(DB, "visits"));
  const views = dataViews.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  //@ts-ignore
  const todayViews = views?.find(item => item?.date === createdAt());

  if (todayViews) {
    //@ts-ignore
    const oldCount = todayViews?.count || 0;
    //@ts-ignore
    const oldCountries = todayViews.countries || {};
    const OldCountryCount = oldCountries[country] || 0;
    await updateDoc(doc(DB, "visits", todayViews.id), {
      count: oldCount + 1,
      countries: {
        ...oldCountries,
        [country]: OldCountryCount + 1,
      },
    });
  } else {
    await addDoc(collection(DB, "visits"), {
      count: 1,
      countries: {
        [country]: 1,
      },
      date: createdAt(),
    });
  }
}
export async function sendMessage({
  firstName,
  lastName,
  email,
  phone,
  entreprise,
  sector,
  message,
}: any) {
  const data = {
    date: createdAt(),
    fullName: firstName + " " + lastName,
    email,
    phone,
    entreprise,
    sector,
    country: getCountry(),
    message,
    timestamp: new Date(),
    seen: false,
  };

  try {
    await addDoc(collection(DB, "messages"), data);
  } catch (error) {
    //@ts-ignore
    throw new Error(error?.message);
  }
  await senEmail({
    request_name: "Message",
    from_name: firstName + " " + lastName,
  });
}

export async function senEmail({ request_name, from_name }) {
  const data = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE,
    user_id: EMAILJS_KEY,
    template_params: {
      request_name,
      from_name,
    },
  };
  await axios
    .post("https://api.emailjs.com/api/v1.0/email/send", data)
    .catch(() => true);
}

export async function subscribeToNewsletter(email: string) {
  try {
    await axios.post(`https://api.convertkit.com/v3/forms/7086343/subscribe`, {
      api_key: "IhyvmjvF2DLT6dJssa-1jQ",
      email,
    });
  } catch (error) {
    console.error(error);
  }
}
