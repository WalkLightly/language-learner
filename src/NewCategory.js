import { useState, useEffect, React } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  CardContent,
  Divider,
  Card,
  CardActions,
  CardHeader,
} from "@mui/material";
import { GetCategories } from "./CategoryApi";
import { addDoc, collection } from "firebase/firestore";
import db from "./firebase";

const NewCategory = ({ currentLang, onCancel }) => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const handleInput = (e) => {
    setNewCategory(e.target.value);
  };

  const initData = () => {
    getCategories();
  };

  const getCategories = () => {
    GetCategories().then((cats) => {
      setCategories(cats);
    });
  };

  const addCategory = async () => {
    if (newCategory.trim() !== "") {
      await addDoc(collection(db, "category"), {
        name: newCategory,
      });
    }

    setNewCategory("");

    onCancel();
  };

  return (
    <Card sx={{ height: "fit-content", width: 350, bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="Add Category"
      />
      <CardContent>
        <TextField
          label="New Category"
          variant="standard"
          value={newCategory}
          sx={{ width: "95%", marginTop: 2 }}
          onChange={handleInput}
        />
        <h3 style={{ marginTop: "20px" }}>Existing Categories</h3>
        <div style={{ height: 200, overflowY: "auto" }}>
          <List>
            {categories.map((cat) => (
              <ListItem
                key={cat}
                sx={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {cat}
              </ListItem>
            ))}
          </List>
        </div>
      </CardContent>
      <Divider />
      <CardActions
        sx={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ bgcolor: "#12908e", color: "rgb(255,255,255)" }}
          onClick={addCategory}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewCategory;
