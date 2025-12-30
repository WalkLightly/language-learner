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
import { AddNewItem } from "./TodoApi";

const NewTodoItem = ({ onCancel }) => {
  const [newItem, setNewItem] = useState("");

  const handleInput = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    AddNewItem(newItem);
    setNewItem("");

    onCancel(true);
  };

  return (
    <Card sx={{ height: "fit-content", width: 350, bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="New Todo Item"
      />
      <CardContent>
        <TextField
          multiline
          rows={5}
          label="Text"
          variant="standard"
          value={newItem}
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
          sx={{ bgcolor: "#12908e", color: "rgb(255,255,255)" }}
          onClick={addItem}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewTodoItem;
