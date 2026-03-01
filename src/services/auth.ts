import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export const loginWithGoogle = async (): Promise<User> => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please add your VITE_FIREBASE_API_KEY to the environment variables.");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  if (!isFirebaseConfigured) return;
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw error;
  }
};
