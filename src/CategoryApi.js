import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const GetCategories = async () => {
  const categories = [];
  const querySnapshot = await getDocs(collection(db, "category"));

  querySnapshot.forEach((doc) => {
    categories.push(doc.data().name);
  });

  return categories;
};
