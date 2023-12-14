import { initializeApp } from 'firebase/app';
import {
  average,
  count,
  doc,
  getAggregateFromServer,
  getDoc,
  getFirestore,
  query,
  setDoc,
  sum,
  where,
} from 'firebase/firestore';
import { collection, getDocs, getCountFromServer, AggregateQuerySnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../config';
import { User } from '../interfaces';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getOrRegisterUser = async (user?: User) => {
  if (!user) {
    return;
  }
  try {
    const docSnap = await getDoc(doc(db, 'user', user.id));

    if (docSnap.exists()) {
      //("Document data:", JSON.stringify(docSnap.data()));
    } else {
      await setDoc(doc(collection(db, 'user'), user.id), user);
    }
  } catch (error) {
    //TODO handle
  }
};

export const putRating = async (uri: string, rating: number, user: User) => {
  try {
    const q = query(collection(db, 'rating'), where('uri', '==', uri), where('user_id', '==', user.id));
    const querySnapshot = await getDocs(q);

    const ratingObject = {
      rating: rating,
      uri: uri,
      user_id: user.id,
      user_name: user.display_name,
    };

    if (!querySnapshot.empty) {
      const response = querySnapshot.docs[0];
      await setDoc(doc(collection(db, 'rating'), response.id), ratingObject);
    } else {
      await setDoc(doc(collection(db, 'rating')), ratingObject);
    }
  } catch (error) {
    //TODO handle
  }
};

export const getRating = async (uri: string, user: User) => {
  try {
    const q = query(collection(db, 'rating'), where('uri', '==', uri), where('user_id', '==', user.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const response = querySnapshot.docs[0];
      const data = response.data();
      console.log('data', data);

      return data['rating'];
    } else {
      console.log('empty');

      return 0;
    }
  } catch (error) {
    console.log('error', error);
    //TODO handle
  }
};
export const getAverageRating = async (uri: string) => {
  try {
    const q = query(collection(db, 'rating'), where('uri', '==', uri));

    const response = await getAggregateFromServer(q, {
      count: count(),
      total: sum('rating'),
    });

    const ratingCount = response.data()['count'];
    const ratingTotal = response.data()['total'];

    return {
      count: ratingCount,
      average: ratingTotal / ratingCount,
    };
  } catch (error) {
    console.log('error', error);
    return {
      count: 0,
      average:0,
    };

    //TODO handle
  }
};
