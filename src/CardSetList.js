import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

const CardSetList = ({ words, selectCardSet, cardSetLength }) => {
  const [cardSets, setCardSets] = useState();
  const [activeCardSetId, setActiveCardSetId] = useState(0);

  useEffect(() => {
    createCardSets();
  }, [words]);

  const chooseCardSet = (cardSet) => {
    setActiveCardSetId(cardSet.id);
    selectCardSet(cardSet);
  };

  const createCardSets = () => {
    let tempCards = [];
    let tempCardSet = [];
    let cardIndex = 1;
    let hasActive = false;
    let cardSetIndex = 0;

    for (const word of words) {
      if (cardIndex > cardSetLength) {
        cardIndex = 1;
        let cardSet = {
          id: cardSetIndex,
          words: tempCards,
        };

        if (!hasActive) {
          setActiveCardSetId(cardSetIndex);
          hasActive = true;
          chooseCardSet(cardSet);
        }

        cardSetIndex++;

        tempCardSet.push(cardSet);
        tempCards = [];
      }

      tempCards.push(word);

      cardIndex++;
    }
    if (tempCards.length > 0) {
      let cardSet = {
        id: cardSetIndex,
        words: tempCards,
      };

      tempCardSet.push(cardSet);
    }

    if (words && words.length <= cardSetLength) {
      let cardSet = {
        id: cardSetIndex,
        words: tempCards,
      };
      if (tempCards.length > 0) selectCardSet(cardSet);
    }
    setCardSets(tempCardSet);
  };

  return (
    <div
      style={{
        height: "270px",
        width: "95vw",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        paddingBottom: "10px",
      }}
    >
      {cardSets &&
        cardSets.map((cardSet) => (
          <Paper
            onClick={() => chooseCardSet(cardSet)}
            key={cardSet.id}
            style={{
              border: cardSet.id === activeCardSetId ? "2px solid red" : "none",
              padding: cardSet.id === activeCardSetId ? "5px" : 0,
              width: "180px",
              height: "140px",
              backgroundColor: "rgb(158, 180, 213)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "90%",
              }}
            >
              {cardSet.words &&
                cardSet.words.map((word) => (
                  <div key={cardSet.id + "-" + word.id}>{word.word}</div>
                ))}
            </div>
          </Paper>
        ))}
    </div>
  );
};

export default CardSetList;
