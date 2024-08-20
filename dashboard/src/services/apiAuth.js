import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { deleteMultipleImages, uploadImage } from "./apiEquipments";
import uuid4 from "uuid4";
export const EMAIL_SECRET = "cb50b696-89f5-474e-8e76-2cbacf3ffd5d630";
export const PASS_SECRET = "79c3b102-3fc7-4bab-sa8d5-14a3331e9ce9452";

export const setLocalEmailnPassword = ({ email, password }) => {
  Array.from({ length: 10 }, () => uuid4()).forEach(item =>
    localStorage.setItem(item, uuid4())
  );
  localStorage.setItem(EMAIL_SECRET, email);
  Array.from({ length: 15 }, () => uuid4()).forEach(item =>
    localStorage.setItem(item, uuid4())
  );
  localStorage.setItem(PASS_SECRET, password);
  Array.from({ length: 10 }, () => uuid4()).forEach(item =>
    localStorage.setItem(item, uuid4())
  );
};
export const getLocalEmailnPassword = () => {
  localStorage.getItem(EMAIL_SECRET);
  localStorage.getItem(PASS_SECRET);
};
export const deleteLocalEmailnPassword = () => {
  localStorage.clear();
};

export async function signup({ fullName, email, password }) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      updateProfile(user.user, {
        displayName: fullName,
      });
    }
    return fullName;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function autoLogin({ email, password }) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res.user;
  } catch (error) {
    console.log(error);

    throw new Error(error?.details);
  }
}
export async function login({ email, password }) {
  try {
    setLocalEmailnPassword({ email, password });
    await setPersistence(auth, browserLocalPersistence);
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.log(error);

    throw new Error(error?.details);
  }
}

export async function getCurrentUser() {
  try {
    const auth = getAuth();
    return auth.currentUser;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function logout() {
  try {
    deleteLocalEmailnPassword();
    await auth.signOut();
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const user = auth.currentUser;
  if (password) {
    try {
      await updatePassword(user, password);
    } catch (error) {
      throw new Error(error?.message);
    }
  }
  if (fullName) {
    try {
      await updateProfile(user, {
        displayName: fullName,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  if (!avatar) return auth.currentUser;

  try {
    await deleteMultipleImages([auth.currentUser.photoURL]);
    const photoURL = await uploadImage(avatar);
    await updateProfile(user, {
      photoURL,
    });
    return auth.currentUser;
  } catch (error) {
    throw new Error(error?.message);
  }
}
