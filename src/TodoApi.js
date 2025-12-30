import db from "./firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

export const GetTodoItems = async () => {
  const items = [];
  const querySnapshot = await getDocs(collection(db, "todo-list"));

  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, value: doc.data().text });
  });

  return items;
};

export const AddNewItem = async (text) => {
  await addDoc(collection(db, "todo-list"), {
    text,
  });
};

export const DeleteItem = async (id) => {
  await deleteDoc(doc(db, "todo-list", id));
};
