import db from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const GetAllDecks = () => {};

export const GetRecentDecksForLanguage = async (language) => {
  let deckIds = [];
  let decks = [];

  // get the deckids from the recent table, then do the decks query below
  const recentDecksSnapshot = await getDocs(
    query(
      collection(db, "recent"),
      where("type", "==", "deck"),
      where("language", "==", language)
    )
  );

  recentDecksSnapshot.forEach((doc) => {
    deckIds.push({ id: doc.id, deckId: doc.data().itemId });
  });

  let words = [];
  for (let i = 0; i < deckIds.length; i++) {
    const wordsQuerySnapshot = await getDocs(
      query(collection(db, "words"), where("deckId", "==", deckIds[i].deckId))
    );

    wordsQuerySnapshot.forEach((doc) => {
      words.push({ id: doc.id, word: doc.data().word });
    });

    decks.push({
      id: deckIds[i].id,
      words: words,
      deckId: deckIds[i].deckId,
    });

    words = [];
  }

  return decks;
};

export const GetAllDecksByLanguage = async (language) => {
  let decks = [];

  const decksQuerySnapshot = await getDocs(
    query(collection(db, "deck"), where("language", "==", language))
  );

  decksQuerySnapshot.forEach((doc) => {
    decks.push({
      id: doc.id,
      language: doc.data().language,
      status: doc.data().status,
      words: [],
    });
  });

  let words = [];
  for (let i = 0; i < decks.length; i++) {
    const wordsQuerySnapshot = await getDocs(
      query(collection(db, "words"), where("deckId", "==", decks[i].id))
    );

    wordsQuerySnapshot.forEach((doc) => {
      words.push({ id: doc.id, ...doc.data() });
    });

    decks[i].words = words;
    words = [];
  }

  return decks;
};

export const GetDecksByLanguageAndStatus = async (language, status) => {
  let decks = [];

  const decksQuerySnapshot = await getDocs(
    query(
      collection(db, "deck"),
      where("language", "==", language),
      where("status", "==", status)
    )
  );

  decksQuerySnapshot.forEach((doc) => {
    decks.push({
      id: doc.id,
      language: doc.data().language,
      status: doc.data().status,
      words: [],
    });
  });

  let words = [];
  for (let i = 0; i < decks.length; i++) {
    const wordsQuerySnapshot = await getDocs(
      query(collection(db, "words"), where("deckId", "==", decks[i].id))
    );

    wordsQuerySnapshot.forEach((doc) => {
      words.push({ id: doc.id, ...doc.data() });
    });

    decks[i].words = words;
    words = [];
  }

  return decks;
};

export const GetWordsForDeckById = async (deckId) => {
  let words = [];

  const decksQuerySnapshot = await getDocs(
    query(collection(db, "words"), where("deckId", "==", deckId))
  );

  decksQuerySnapshot.forEach((doc) => {
    words.push({
      word: doc.data().word,
      id: doc.id,
      status: doc.data().status,
    });
  });

  return words;
};

export const CreateNewDeck = async (language, status, wordIds = []) => {
  const docRef = await addDoc(collection(db, "deck"), {
    language: language,
    status: status,
  });
  console.log(docRef.id, wordIds);

  if (wordIds.length > 0) {
    await UpdateDeckIdForWords(docRef.id, wordIds);
  }
  // now associate the words with the new deck
};

export const DeleteDeck = async (deckId) => {
  await deleteDoc(doc(db, "deck", deckId));

  const wordsQuerySnapshot = await getDocs(
    query(collection(db, "words"), where("deckId", "==", deckId))
  );

  wordsQuerySnapshot.forEach((d) => {
    const docRef = doc(db, "words", d.id);

    updateDoc(docRef, {
      deckId: "",
    });
  });

  // find all the words with that deckId, and remove that association
};

export const UpdateDeckIdForWords = async (deckId, wordIds) => {
  const querySnapshot = await getDocs(collection(db, "words"));

  querySnapshot.forEach((d) => {
    const docRef = doc(db, "words", d.id);

    if (wordIds.includes(docRef.id)) {
      const updateDeckId = updateDoc(docRef, {
        deckId: deckId,
      });
    }
  });
};
