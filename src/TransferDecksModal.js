import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import CompareArrows from "@mui/icons-material/CompareArrows";
import { GetWordsForDeckById, UpdateDeckIdForWords } from "./DeckApi";

const TransferDecksModal = ({ topDeckId, bottomDeckId, closeModal }) => {
  const [topDeck, setTopDeck] = useState(null);
  const [bottomDeck, setBottomDeck] = useState(null);
  const [loadingBottom, setLoadingBottom] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  const colorMap = {
    Learned: "green",
    Unsure: "yellow",
    New: "red",
  };

  useEffect(() => {
    if (topDeckId && bottomDeckId) getDecks();
  }, []);

  const transferWords = () => {
    UpdateDeckIdForWords(
      topDeckId,
      topDeck.words.map((x) => x.id)
    );
    UpdateDeckIdForWords(
      bottomDeckId,
      bottomDeck.words.map((x) => x.id)
    );

    closeModal();
  };

  const timeout = (seconds) => {
    return new Promise((res) => setTimeout(res, seconds));
  };

  const getDecks = async () => {
    let topDeckObj = {
      deckId: topDeckId,
      words: [],
    };

    let bottomDeckObj = {
      deckId: bottomDeckId,
      words: [],
    };

    GetWordsForDeckById(topDeckId).then((words) => {
      topDeckObj.words = words;
      setTopDeck(topDeckObj);
      setLoadingTop(false);
    });

    GetWordsForDeckById(bottomDeckId).then((words) => {
      bottomDeckObj.words = words;
      setBottomDeck(bottomDeckObj);
      setLoadingBottom(false);
    });
  };

  const transferToTopDeck = async (word) => {
    var card = document.getElementById(word.id);
    card.classList.toggle("transfer");

    await timeout(150);
    const newTopDeck = {
      deckId: topDeckId,
      words: [...topDeck.words, word],
    };

    setTopDeck(newTopDeck);
    // remove from the Bottom deck
    const newBottomDeck = {
      deckId: bottomDeckId,
      words: [...bottomDeck.words.filter((x) => x.id !== word.id)],
    };
    setBottomDeck(newBottomDeck);

    await timeout(2000);
    card.classList.toggle("transfer");
  };

  const transferToBottomDeck = async (word) => {
    var card = document.getElementById(word.id);
    card.classList.toggle("transfer");

    await timeout(150);
    const newBottomDeck = {
      deckId: bottomDeckId,
      words: [...bottomDeck.words, word],
    };

    setBottomDeck(newBottomDeck);
    // remove from the Bottom deck
    const newTopDeck = {
      deckId: topDeckId,
      words: [...topDeck.words.filter((x) => x.id !== word.id)],
    };
    setTopDeck(newTopDeck);

    await timeout(2000);
    card.classList.toggle("transfer");
  };

  return (
    <Card
      sx={{
        height: "fit-content",
        width: "95vw",
        height: "95vh",
      }}
    >
      <CardHeader
        sx={{ bgcolor: "purple", height: 15, color: "white" }}
        title="Transfer Between Decks"
      />
      <CardContent style={{ height: "83%" }}>
        <Paper
          elevation={5}
          sx={{
            height: 300,
            width: "99%",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            gap: "5px",
            overflowX: "auto",
            padding: "5px",
          }}
        >
          {!loadingTop &&
            topDeck &&
            topDeck.words.map((w) => (
              <Paper
                id={w.id}
                key={w.id}
                onClick={() => {
                  transferToBottomDeck(w);
                }}
                style={{
                  borderLeft: `4px solid ${colorMap[w.status]}`,
                  backgroundColor: "#dfd7d7",
                  width: "5px",
                  marginRight: "5px",
                  width: "fitContent",
                  height: 30,
                  padding: 5,
                  minWidth: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {w.word}
              </Paper>
            ))}
          {loadingTop && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                gap: "4px",
                marginLeft: 5,
              }}
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
            </div>
          )}
        </Paper>
        <Box sx={{ mt: 1 }}>
          Words In Deck: {topDeck?.words.length}
          {topDeck?.words.length === 0 && (
            <div style={{ color: "red", fontSize: 15, margin: 0 }}>
              This deck will be deleted upon save
            </div>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            placeContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <CompareArrows sx={{ transform: "rotate(90deg)", color: "purple" }} />
        </Box>
        <Paper
          elevation={5}
          sx={{
            height: 300,
            width: "99%",
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            overflowX: "auto",
            alignContent: "flex-start",
            padding: "5px",
          }}
        >
          {!loadingBottom &&
            bottomDeck &&
            bottomDeck.words.map((w) => (
              <Paper
                id={w.id}
                key={w.id}
                onClick={() => {
                  transferToTopDeck(w);
                }}
                style={{
                  borderLeft: `4px solid ${colorMap[w.status]}`,
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
                {w.word}
              </Paper>
            ))}
          {loadingBottom && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                gap: "4px",
                marginLeft: 5,
              }}
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                style={{ borderRadius: 5 }}
              />
            </div>
          )}
        </Paper>
        <Box sx={{ mt: 1 }}>
          Words In Deck: {bottomDeck?.words.length}
          {bottomDeck?.words.length === 0 && (
            <div style={{ color: "red", fontSize: 15 }}>
              This deck will be deleted upon save
            </div>
          )}
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          width: "95%",
          marginTop: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={closeModal}
        >
          CLOSE
        </Button>
        <Button
          sx={{ bgcolor: "#12908e", color: "rgb(255,255,255)" }}
          onClick={transferWords}
        >
          SAVE
        </Button>
      </CardActions>
    </Card>
  );
};

export default TransferDecksModal;
