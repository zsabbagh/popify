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
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { collection, getDocs, getCountFromServer, AggregateQuerySnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../config';
import { ItemData, SpotifyTrack, User } from '../interfaces';
import { Comment } from '../interfaces';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Currently only registers users
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

export const getUser = async (userId: string) => {
  if (!userId) {
    return;
  }
  try {
    const docSnap = await getDoc(doc(db, 'user', userId));

    if (docSnap.exists()) {
      return docSnap.data();
      //("Document data:", JSON.stringify(docSnap.data()));
    } else {
      return;
    }
  } catch (error) {
    //TODO handle
  }
};

export const pushCartFirebase = async (cart?: ItemData[], user?: User) => {
  if (!cart || !user) {
    return;
  }

  try {
   await setDoc(doc(collection(db, 'cart'), user.id), {cart: cart});
  
  } catch (error) {
    console.log("error", error);
    //TODO handle
  }
};

export const getCartFirebase = async (user?: User) => {
  if (!user) {
    return;
  }
  try {
    const docSnap = await getDoc(doc(db, 'cart', user.id));

    if (docSnap.exists()) {
      return docSnap.data().cart as ItemData[];
      //("Document data:", JSON.stringify(docSnap.data()));
    } else {
      return;
    }
  } catch (error) {
    //TODO handle
  }
};


export const putPlaylist = async (playlist: SpotifyTrack[], userId?: string ) => {
  if (!userId) {
    return;
  }

  const playlistObject = {
    playlist: playlist,
    userId: userId,
    timestamp: Timestamp.now()
  }
  try {
    await setDoc(doc(collection(db, 'playlist')), playlistObject);

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
      timestamp: Timestamp.now(),
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
      average: 0,
    };
  }
};

export const getComments = async (uri: string): Promise<Comment[]> => {
  try {
    const response = await getDocs(query(collection(db, 'comment'), where('uri', '==', uri), orderBy('timestamp', "desc")));
    
    if (response.empty) {
      return [];
    } else {
      return response.docs.map((doc) => doc.data()) as Comment[];
    }
  } catch (error) {
    console.log("error", error);
    
    return [];
    //TODO handle
  }
};

export const postComment = async (uri: string, user: User, content: string, title: string) => {
  try {
    const commentObject = {
      title: title,
      content: content,
      uri: uri,
      user_id: user.id,
      user_name: user.display_name,
      user_image: user.images[0].url,
      timestamp: Timestamp.now(),
    };
    await setDoc(doc(collection(db, 'comment')), commentObject);
    return commentObject;
  } catch (error) {
    return null;
    //TODO handle
  }
};
