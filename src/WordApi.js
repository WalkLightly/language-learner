import db from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const GetWordById = async (id) => {
  const docRef = doc(db, "words", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data;
    const word = {
      id: docSnap.id,
      word: data.word,
      language: data.language,
      category: data.category,
      status: data.status,
      definitions: data.definitions.split(";"),
    };

    return word;
  } else {
    return null;
  }
};

export const GetWordsForLanguageByCategory = async (language, category) => {
  const words = [];
  const querySnapshot = await getDocs(
    query(collection(db, "words"), where("language", "==", language))
  );

  querySnapshot.forEach((doc) => {
    if (doc.data().category.toLowerCase() === category.toLowerCase()) {
      const data = doc.data();
      const word = {
        category: data.category,
        definition: data.definition,
        goodTimes: data.goodTimes,
        language: data.language,
        status: data.status,
        unsureTimes: data.unsureTimes,
        word: data.word,
        id: doc.id,
        numberValue: data.numberValue,
      };
      words.push(word);
    }
  });
  console.log(words);
  return words;
};

export const GetWordsForLanguageByStatus = async (language, status) => {
  const words = [];
  const querySnapshot = await getDocs(
    query(collection(db, "words"), where("language", "==", language))
  );

  querySnapshot.forEach((doc) => {
    if (doc.data().status.toLowerCase() === status.toLowerCase()) {
      const data = doc.data();
      const word = {
        category: data.category,
        definition: data.definition,
        goodTimes: data.goodTimes,
        language: data.language,
        status: data.status,
        unsureTimes: data.unsureTimes,
        word: data.word,
        id: doc.id,
        numberValue: doc.numberValue,
      };
      words.push(word);
    }
  });

  return words;
};

export const GetWordsForLanguage = async (language) => {
  const words = [];
  const querySnapshot = await getDocs(
    query(collection(db, "words"), where("language", "==", language))
  );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const word = {
      category: data.category,
      definition: data.definition,
      goodTimes: data.goodTimes,
      language: data.language,
      status: data.status,
      unsureTimes: data.unsureTimes,
      word: data.word,
      id: doc.id,
      numberValue: doc.numberValue,
    };
    words.push(word);
  });

  return words;
};

export const GetAllWords = async () => {
  const words = [];
  const querySnapshot = await getDocs(collection(db, "words"));

  querySnapshot.forEach((doc) => {
    words.push(doc.data().name);
  });

  return words;
};

export const AddDeckIdField = async () => {
  const querySnapshot = await getDocs(collection(db, "words"));

  querySnapshot.forEach((d) => {
    const docRef = doc(db, "words", d.id);

    const updateStatus = updateDoc(docRef, {
      numberValue: "",
    });
  });
};

export const UpdateStatus = async (newStatus, id) => {
  const docRef = doc(db, "words", id);

  const updateStatus = await updateDoc(docRef, {
    status: newStatus,
  });
};

export const UpdateWord = async (word) => {
  const docRef = doc(db, "words", word.id);

  // Update the timestamp field with the value from the server
  const updateWord = await updateDoc(docRef, {
    category: word.category,
    definition: word.definition,
    status: word.status,
    word: word.word,
    language: word.language,
  });
};

export const DeleteWordById = async (id) => {
  await deleteDoc(doc(db, "words", id));
};

export const GetRecentWordsForLanguage = async (language) => {
  let wordIds = [];
  let recentWords = [];

  // get the wordIds from the recent table, then do the decks query below
  const recentWordsSnapshot = await getDocs(
    query(
      collection(db, "recent"),
      where("type", "==", "word"),
      where("language", "==", language)
    )
  );

  recentWordsSnapshot.forEach((doc) => {
    wordIds.push({ id: doc.id, wordId: doc.data().itemId });
  });

  let words = [];
  for (var i = 0; i < wordIds.length; i++) {
    const docRef = doc(db, "words", wordIds[i].wordId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      words.push({ id: docSnap.id, word: docSnap.data().word });
    }
  }

  return words;
};
