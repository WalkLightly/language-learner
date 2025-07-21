import React, { useState, useEffect } from "react";
import { GetDecksByLanguageAndStatus } from "./DeckApi";
import { Paper } from "@mui/material";
import CardSetList from "./CardSetList";

const DecksBottomContainer = ({ language, status, selectCardSet }) => {
  const [decks, setDecks] = useState(null);
  const [selectedDeckWords, setSelectedDeckWords] = useState(null);

  useEffect(() => {
    getAllDecks();
  }, []);

  const getWordsFromSelectedDeck = (words) => {
    setSelectedDeckWords(words);
  };

  const getAllDecks = async () => {
    GetDecksByLanguageAndStatus(language, status).then((dcks) => {
      setDecks(dcks);
    });
  };
  return (
    <div>
      {/* Curent deck split up into groups of 3 */}
      <div
        className="results-item"
        style={{
          height: 300,
          marginTop: 3,
          marginBottom: 5,
          width: "97vw",
          borderRadius: 5,
        }}
      >
        {selectedDeckWords && (
          <>
            <h3 style={{ margin: "5px 12px" }}>
              Total Words: {selectedDeckWords?.length}
            </h3>
            <CardSetList
              words={selectedDeckWords}
              selectCardSet={selectCardSet}
              cardSetLength="3"
            />
          </>
        )}
      </div>
      {/* For list of all decks */}
      <div
        className="results-item"
        style={{
          borderRadius: 10,
          height: 120,
          width: "95vw",
          overflowX: "auto",
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5, marginLeft: 5 }}>
          {decks &&
            decks.map((deck) => (
              <Paper
                onClick={() => getWordsFromSelectedDeck(deck.words)}
                key={deck.id}
                style={{
                  height: 100,
                  width: 100,
                  padding: 2,
                  overflowY: "auto",
                }}
              >
                {deck.words.map((word) => (
                  <div key={`deck-${word.id}`}>{word.word}</div>
                ))}
              </Paper>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DecksBottomContainer;
