import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../config';
import { User } from '../interfaces';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getOrRegisterUser = async (user?: User) => {
  if(!user){
    return;
  }

  try {
    const docSnap =  await getDoc(doc(db, "user", user.id));

    if (docSnap.exists()) {
      console.log("Document data:", JSON.stringify(docSnap.data()));
    } else {
      await setDoc(doc(collection(db, "user"), user.id), {
        username: user.display_name,
        points: 0,
      });
    }
  } catch (error) {
    //TODO handle
  }

}
