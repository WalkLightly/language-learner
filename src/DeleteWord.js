import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Button,
  CardActions,
  Divider,
} from "@mui/material";

const DeleteWord = ({ onCancel, word, onDelete }) => {
  return (
    <Card sx={{ height: "fit-content", width: 350, bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{ bgcolor: "red", height: 15, color: "white" }}
        title="Confirm Delete"
      />
      <CardContent sx={{ my: 3 }}>
        Are you sure you want to delete - {word.word} -?
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
          sx={{ bgcolor: "red", color: "rgb(255,255,255)" }}
          onClick={() => onDelete(word.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeleteWord;
