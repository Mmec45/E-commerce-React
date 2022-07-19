// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// importation de la phase d'authentication de firebase
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
// imprtation de la bd creer dans fireStrom
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd3rwGvPpAKb4JfrD1LD3BR6almWVcsD0",
  authDomain: "e-commerce-react-69230.firebaseapp.com",
  projectId: "e-commerce-react-69230",
  storageBucket: "e-commerce-react-69230.appspot.com",
  messagingSenderId: "16261959785",
  appId: "1:16261959785:web:d534aff4b2a128231cd2f8"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

// fournisseur google Earth
const provider = new GoogleAuthProvider();

// initaliser les differents types styles de configurations de google
provider.setCustomParameters({
  prompt: "select_account",
});

//import l'authenticaation de google vers firebase
export const auth = getAuth();
// import l'authentication par popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// obtenir la db contenue dans firestore
export const db = getFirestore();
// recoit l'objet d'Auth de l'user
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  // snapshot est une instance de donnée et de voir si elle exsite ou pas et d'entre de la bd 
  const userSnapshot = await getDoc(userDocRef);
  // verifier les donneés existent et avoir le nom et l'emailet creer une nouvelle date
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // obtenir les donnés de l'user si oui
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
