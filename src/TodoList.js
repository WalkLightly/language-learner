import AddIcon from "@mui/icons-material/Add";
import { Paper, Card, Fab } from "@mui/material";
import { useState, React, useEffect } from "react";

const TodoList = () => {
  return (
    <div style={{ width: "98%" }}>
      <Paper
        elevation={4}
        sx={{
          justifySelf: "center",
          mr: 2,
          mt: 1,
          py: 2,
          px: 2,
          height: 20,
          bgcolor: "#c4421a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 155,
        }}
      >
        <h2
          style={{
            borderRadius: "10px",
            margin: 0,
            padding: "0",
            color: "white",
          }}
        >
          TODOs
        </h2>
      </Paper>
      <Card
        className="results-item"
        style={{
          overflowY: "auto",
          height: 500,
          width: "90%",
          justifySelf: "center",
          marginTop: 10,
          padding: 10,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "90%",
            height: "auto",
            justifySelf: "center",
            mb: 2,
            padding: 2,
          }}
        >
          Make sure jamie knows that she is super beautiful, ad that there is no
          one else Id want to marry come march 28th Make sure jamie knows that
          she is super beautiful, ad that there is no one else Id want to marry
          come march 28th Make sure jamie knows that she is super beautiful, ad
          that there is no one else Id want to marry come march 28th Make sure
          jamie knows that she is super beautiful, ad that there is no one else
          Id want to marry come march 28th
        </Paper>
        <Paper
          elevation={5}
          sx={{
            width: "90%",
            height: "auto",
            justifySelf: "center",
            mb: 2,
            padding: 2,
          }}
        >
          Make sure jamie knows that she is super beautiful, ad that there is no
          one else Id want to marry come march 28th Make sure jamie knows that
          she is super beautiful, ad that there is no one else Id want to marry
          come march 28th Make sure jamie knows that she is super beautiful, ad
          that there is no one else Id want to marry come march 28th Make sure
          jamie knows that she is super beautiful, ad that there is no one else
          Id want to marry come march 28th
        </Paper>
      </Card>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default TodoList;
