import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Paper,
  Avatar,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  Fab,
  Switch,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import CardSetList from "./CardSetList";

const BottomContainer = ({ words, selectCardSet, cardSetContext }) => {
  const [bottomToggleSection, setBottomToggleSection] = useState("card-sets");
  const [doingNumbers, setDoingNumbers] = useState(cardSetContext === "Number");
  const [filterRange, setFilterRange] = useState([0, 10]);

  const handleBottomToggleChange = (e, buttonToggle) => {
    setBottomToggleSection(buttonToggle);
  };

  useEffect(() => {
    console.log(words);
  }, []);

  const setCards = (lowerRange, upperRange) => {
    setFilterRange([lowerRange, upperRange]);
    let filteredWords = null;
    console.log(lowerRange, upperRange);
    if (lowerRange !== null && upperRange !== null) {
      // i.e 10-20, 20-30 etc
      filteredWords = words.filter(
        (x) => +x.numberValue >= lowerRange && +x.numberValue < upperRange
      );
      console.log(words);
    } else if (lowerRange && !upperRange) {
      console.log("here in 100+");
      // 100+
      filteredWords = words.filter((x) => +x.numberValue >= lowerRange);
    } else {
      console.log("here in random");
      filteredWords = words;
    }
    selectCardSet({ id: 1, words: filteredWords });
  };

  return (
    <>
      <div id="card-set-container" style={{ width: "95vw" }}>
        {doingNumbers && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Button
              onClick={() => setCards(0, 10)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              0-10
            </Button>
            <Button
              onClick={() => setCards(10, 20)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              10-20
            </Button>
            <Button
              onClick={() => setCards(20, 30)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              20-30
            </Button>
            <Button
              onClick={() => setCards(30, 40)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              30-40
            </Button>
            <Button
              onClick={() => setCards(40, 50)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              40-50
            </Button>
            <Button
              onClick={() => setCards(50, 60)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              50-60
            </Button>
            <Button
              onClick={() => setCards(60, 70)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              60-70
            </Button>
            <Button
              onClick={() => setCards(70, 80)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              70-80
            </Button>
            <Button
              onClick={() => setCards(80, 90)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              80-90
            </Button>
            <Button
              onClick={() => setCards(90, 100)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              90-100
            </Button>
            <Button
              onClick={() => setCards(100, null)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              100+
            </Button>
            <Button
              onClick={() => setCards(null, null)}
              variant="contained"
              style={{ backgroundColor: "#16594a", height: 90, width: 90 }}
            >
              <ShuffleIcon sx={{ fontSize: "50px" }} />
            </Button>
          </div>
        )}
        {!doingNumbers && (
          <>
            <h3 style={{ margin: "5px 12px" }}>Total Words: {words.length}</h3>
            <CardSetList
              words={words}
              selectCardSet={selectCardSet}
              cardSetLength={cardSetContext === "New Words" ? 3 : 20}
            />
          </>
        )}
      </div>
      <Paper
        sx={{
          display: "flex",
          bgcolor: "#16594a",
          ml: 1,
          mt: 2,
          height: 40,
          width: "fit-content",
        }}
      >
        <ToggleButtonGroup
          size="small"
          exclusive
          value={bottomToggleSection}
          onChange={handleBottomToggleChange}
        >
          <ToggleButton
            sx={{
              margin: 1,
              border: "1px solid transparent",
              "&.Mui-selected": {
                backgroundColor: "#f98f45",
                borderRadius: "5px!important",
              },
            }}
            value="card-sets"
          >
            Card Sets
          </ToggleButton>
          <ToggleButton
            sx={{
              margin: 1,
              border: "1px solid transparent",
              "&.Mui-selected": {
                backgroundColor: "#f98f45",
                borderRadius: "5px!important",
              },
            }}
            value="example-sentences"
          >
            Sentences
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </>
  );
};

export default BottomContainer;
