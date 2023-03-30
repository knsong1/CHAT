import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCpyRAZcy6XLnB8KSTfPkpu0OcGXCHcs-M',
  authDomain: 'chatty-dcf9f.firebaseapp.com',
  projectId: 'chatty-dcf9f',
  storageBucket: 'chatty-dcf9f.appspot.com',
  messagingSenderId: '179611133861',
  appId: '1:179611133861:web:5f2f5f8af91c633aceea4c',
  measurementId: 'G-T50SD5NQ2S',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const userRef = db.doc(`users/${userAuth.uid}`);
//   const snapShot = await userRef.get();

//   console.log(snapShot);
//   if (!snapShot.exists) {
//     const { displayName, email, firstName, lastName } = userAuth;
//     const createdAt = new Date();

//     try {
//       await userRef.set({
//         firstName,
//         lastName,
//         displayName,
//         email,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log('Error creating user: ', error.message);
//     }
//   }
// };
