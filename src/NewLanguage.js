import { useState, React } from "react";
import {
  Button,
  TextField,
  CardContent,
  Divider,
  Card,
  CardActions,
  CardHeader,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebase";

const NewLanguage = ({ currentLang, onCancel }) => {
  const [newLanguage, setNewLanguage] = useState("");

  const handleInput = (e) => {
    setNewLanguage(e.target.value);
  };

  const addLanguage = async () => {
    if (newLanguage.trim() !== "") {
      await addDoc(collection(db, "language"), {
        name: newLanguage,
        wordCount: 0,
      });
    }

    onCancel();
  };

  return (
    <Card sx={{ height: "fit-content", width: 350, bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="Add Language"
      />
      <CardContent>
        <TextField
          label="New Language"
          variant="standard"
          value={newLanguage}
          sx={{ width: "95%", marginTop: 2 }}
          onChange={handleInput}
        />
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
          disabled={newLanguage.trim() === ""}
          sx={{ bgcolor: "#12908e", color: "rgb(255,255,255)" }}
          onClick={addLanguage}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};
export default NewLanguage;
