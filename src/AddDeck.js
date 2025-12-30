import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Divider,
  Button,
  CardActions,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  TextField,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetAllDecksByLanguage } from "./DeckApi";
import { GetWordsForLanguage } from "./WordApi";

import WordsList from "./WordsList";

const AddDeck = ({ onCancel }) => {
  const [decks, setDecks] = useState(null);
  const [wordsInDeck, setWordsInDeck] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [loadingDecks, setLoadingDecks] = useState(true);
  const [loadingWords, setLoadingWords] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, deck) => {
    console.log(deck);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const colorMap = {
    Learned: "green",
    Unsure: "yellow",
    New: "red",
  };

  useEffect(() => {
    GetAllDecksByLanguage("Italian").then((data) => {
      setDecks(data);
      setLoadingDecks(false);
    });
    getWordsList();
  }, []);

  const addToList = (word, id) => {
    let tempWords = [];
    if (wordsInDeck) {
      tempWords = wordsInDeck;
    }

    if (tempWords.filter((x) => x.id === id).length === 0) {
      tempWords.push({ id, word });
      setWordsInDeck([...tempWords]);
    }
  };
  const searchForWord = (e) => {
    setSearch(e.target.value);
  };

  const getWordsList = () => {
    GetWordsForLanguage("Italian").then((words) => {
      setResults(words);
      setLoadingWords(false);
    });
  };

  const addDeck = () => {};

  return (
    <Card
      sx={{
        height: "fit-content",
        width: "95vw",
        height: "85vh",
      }}
    >
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="Create A Deck"
      />
      <CardContent
        style={{
          height: "80%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={8} sx={{ height: 450, width: "104%", mb: 1 }}>
          <div style={{ height: 210, width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                value={search}
                sx={{
                  height: "40px",
                  width: "95%",
                  marginTop: 1,
                  border: "1px solid #f98f45",
                  borderRadius: "5px",
                  "& fieldset": { border: "none" },
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={searchForWord}
              />
              <div
                style={{
                  height: 170,
                  overflowY: "auto",
                  marginTop: 1,
                  paddingTop: 5,
                }}
              >
                {loadingWords && (
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                    <Skeleton variant="rectangular" width={370} height={30} />
                  </div>
                )}
                {!loadingWords && (
                  <List sx={{ borderRadius: "5px", width: "87vw" }}>
                    {results &&
                      results
                        .filter((word) =>
                          word.word.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((result, index) => (
                          <React.Fragment key={result.word}>
                            <ListItem
                              onClick={() => addToList(result.word, result.id)}
                              style={{
                                borderLeft: `4px solid ${
                                  colorMap[result.status]
                                }`,
                                height: "30px",
                                width: "100%",
                              }}
                            >
                              <ListItemText
                                primary={
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div>{result.word}</div>
                                    <span
                                      style={{
                                        paddingTop: 5,
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        opacity: 0.5,
                                      }}
                                    >
                                      {result.definition.split(";")[0]}{" "}
                                    </span>
                                  </div>
                                }
                              ></ListItemText>
                            </ListItem>
                            {index < results.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                  </List>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Divider sx={{ width: "25%" }} />
            <h4>Words in Deck: {wordsInDeck ? wordsInDeck.length : 0}</h4>
            <Divider sx={{ width: "25%" }} />
          </div>
          <Paper
            elevation={0}
            sx={{
              marginTop: "-12px",
              height: 140,
              width: "94%",
              marginLeft: "4px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: "5px",
              overflowX: "auto",
              padding: "5px",
            }}
          >
            {wordsInDeck &&
              wordsInDeck.map((w) => (
                <div
                  onClick={() => {
                    const tempWords = wordsInDeck.filter((x) => x.id !== w.id);
                    setWordsInDeck(tempWords);
                  }}
                  style={{ width: "fitContent", marginRight: "5px" }}
                  key={`${w.word}=${w.id}`}
                >
                  {w.word}
                </div>
              ))}
          </Paper>
        </Paper>
        <Paper
          elevation={5}
          sx={{
            height: 120,
            overflowX: "auto",
            width: "100%",
            display: "flex",
            padding: "5px",
            gap: "4px",
          }}
        >
          {loadingDecks && (
            <div style={{ display: "flex", gap: 5 }}>
              <Skeleton variant="rectangular" width={120} height={120} />
              <Skeleton variant="rectangular" width={120} height={120} />
              <Skeleton variant="rectangular" width={120} height={120} />
            </div>
          )}
          {/* Bottom Container showing all the decks currenlty made for this language */}
          {!loadingDecks &&
            decks &&
            decks.map((deck) => (
              <div
                key={deck.id}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Paper
                  onClick={(e) => {
                    handleClick(e, deck);
                  }}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderLeft: `4px solid ${colorMap[deck.status]}`,
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
                    top: "-105px",
                    left: "90px",
                    backgroundColor: "#f98f45",
                  }}
                >
                  {deck.words.length}
                </Paper>
              </div>
            ))}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
                onClick={handleClose}
              >
                <span style={{ width: 60 }}>Edit</span>
                <EditIcon />
              </MenuItem>
              <Divider />
              <MenuItem
                style={{ opacity: 0.6, display: "flex", gap: 30 }}
                onClick={handleClose}
              >
                <span style={{ width: 60 }}>Delete</span>
                <DeleteIcon />
              </MenuItem>
            </MenuList>
          </Menu>
        </Paper>
      </CardContent>
      <Divider />
      <CardActions
        sx={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={onCancel}
        >
          Close
        </Button>
        <Button
          disabled={wordsInDeck && wordsInDeck.length === 0}
          sx={{
            bgcolor:
              wordsInDeck && wordsInDeck.length > 0 ? "#12908e" : "#12908e47",
            color: "rgb(255,255,255)",
          }}
          onClick={addDeck}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddDeck;
