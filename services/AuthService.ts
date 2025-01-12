import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from './FirebaseConfig';

export const registerUser = async (email: string, password: string, userData: any): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;
  await set(ref(database, `users/${userId}`), userData);
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};