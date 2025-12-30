import db from "./firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const GetItems = async () => {
  const items = [];
  const querySnapshot = await getDocs(collection(db, "todo-list"));

  querySnapshot.forEach((doc) => {
    items.push(doc.data().name);
  });

  return items;
};

const AddNewItem = async (text) => {
  await addDoc(collection(db, "todo-list"), {
    text,
  });
};

const DeleteItem = async (id) => {
  await deleteDoc(doc(db, "todo-list", id));
};
