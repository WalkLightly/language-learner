import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Menu,
  MenuList,
  MenuItem,
  Modal,
  Divider,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CompareArrows from "@mui/icons-material/CompareArrows";
import { GetRecentDecksForLanguage } from "./DeckApi";
import { GetRecentWordsForLanguage } from "./WordApi";

const RecentItems = ({ currentLang }) => {
  const [loadingDecks, setLoadingDecks] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [decks, setDecks] = useState(null);
  const [words, setWords] = useState(null);
  const [wordSelectMode, setWordSelectMode] = useState(true);

  const open = Boolean(anchorEl);

  useEffect(() => {
    GetRecentDecksForLanguage(currentLang).then((decks) => {
      setDecks(decks);
      setLoadingDecks(false);
    });

    GetRecentWordsForLanguage(currentLang).then((words) => {
      setWords(words);
    });
  }, []);

  const handleClose = (action, deckId = null) => {};

  const handleClick = (e, deck) => {};

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "94vh",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "90%",
          width: "95%",
        }}
      >
        <div style={{ color: "white", fontSize: 40 }}>Decks</div>
        <div
          className="frosty-mask"
          style={{
            padding: 10,
            gap: 5,
            height: 300,
            borderRadius: 10,
            marginBottom: 60,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {loadingDecks && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignContent: "flex-start",
                  gap: "5px",
                  marginLeft: 5,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />{" "}
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />{" "}
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={120}
                  style={{ backgroundColor: "#3d3b3b" }}
                />{" "}
              </div>
            </div>
          )}
          {!loadingDecks &&
            decks &&
            decks.map((deck) => (
              <div key={deck.id}>
                <Paper
                  onClick={(e) => {
                    handleClick(e, deck);
                  }}
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "rgb(158, 180, 213)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowY: "auto",
                  }}
                >
                  {deck.words.map((word) => (
                    <div
                      key={word.id}
                      style={{
                        width: "90%",
                      }}
                    >
                      {word.word}
                    </div>
                  ))}
                </Paper>
                <Paper
                  elevation={5}
                  style={{
                    borderRadius: 5,
                    width: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    top: "-115px",
                    left: "95px",
                    backgroundColor: "#f98f45",
                  }}
                >
                  {deck.words.length}
                </Paper>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  style={{
                    top: "-200px",
                    left: "10px",
                  }}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuList dense>
                    <MenuItem
                      style={{
                        opacity: 0.6,
                        display: "flex",
                        gap: 30,
                      }}
                      onClick={() => {
                        handleClose("edit");
                      }}
                    >
                      <span style={{ width: 60 }}>Edit</span>
                      <EditIcon style={{ color: "orange" }} />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      style={{ opacity: 0.6, display: "flex", gap: 30 }}
                      onClick={() => {
                        handleClose("delete");
                      }}
                    >
                      <span style={{ width: 60 }}>Delete</span>
                      <DeleteIcon style={{ color: "red" }} />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      style={{ opacity: 0.6, display: "flex", gap: 30 }}
                      onClick={() => {
                        handleClose("transfer", deck.id);
                      }}
                    >
                      <span style={{ width: 60 }}>Transfer</span>
                      <CompareArrows style={{ color: "purple" }} />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ))}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 40,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>Words</div>
          <div>
            <Button
              variant="contained"
              style={{ height: 40, marginTop: 3, backgroundColor: "#66410f" }}
            >
              choose words
            </Button>
          </div>
        </div>
        <div
          className="frosty-mask"
          style={{
            width: "100%",
            height: 300,
            borderRadius: 10,
            display: "flex",
            flexWrap: "wrap",
            padding: 10,
            alignContent: "flex-start",
          }}
        >
          {words &&
            words.map((word) => (
              <Paper
                style={{
                  backgroundColor: "#dfd7d7",
                  width: "5px",
                  marginRight: "5px",
                  width: "fitContent",
                  height: "30px",
                  padding: 5,
                  minWidth: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {word.word}
              </Paper>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentItems;
