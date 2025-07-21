import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CardContent,
  Divider,
  Card,
  CardActions,
  CardHeader,
} from "@mui/material";

const CardsInSetListView = ({ closeModal, words }) => {
  useEffect(() => {}, []);
  return (
    <Card
      sx={{
        height: "fit-content",
        width: 350,
        bgcolor: "#cfcfcf",
      }}
    >
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="Cards in set"
      />
      <CardContent
        style={{
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        {words && words.map((word) => <h3 key={word.id}>{word.word}</h3>)}
      </CardContent>
      <Divider />
      <CardActions
        sx={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={closeModal}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardsInSetListView;
