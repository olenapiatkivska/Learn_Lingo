import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { auth } from './firebaseConfig.js';

export const useFavorite = database => {
  const [favorite, setFavorite] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const favRef = ref(database, `/favorite/${user.uid}`);
    const unsubscribe = onValue(favRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        setFavorite(Object.values(data));
      } else {
        setFavorite([]);
      }
    });

    return () => unsubscribe();
  }, [user, database]);

  return favorite;
};
