// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// importation de la phase d'authentication de firebase avec google et redirection signIn
import {
  getAuth,
 // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
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

// fournisseur google authentication with firebase
const googleProvider = new GoogleAuthProvider();

// initaliser les differents types styles de configurations de google
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//import l'authenticaation de google vers firebase
export const auth = getAuth();
// import l'authentication par popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// importation de l'auth avec redirection google
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// obtenir la db contenue dans firestore
export const db = getFirestore();
// recoit l'objet d'Auth de l'user
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
  if(!userAuth) return;
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

// create the instance for create the email and password in firestorm and transfert the auth, email password at firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
