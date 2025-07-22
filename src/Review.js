import { useState, React, useEffect, Fragment } from "react";
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
  MenuItem,
  MenuList,
  Menu,
  Divider,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import EditIcon from "@mui/icons-material/Edit";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import HistoryIcon from "@mui/icons-material/History";
import EditWord from "./EditWord";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AddDeckIdField,
  GetWordsForLanguage,
  GetWordsForLanguageByCategory,
  GetWordsForLanguageByStatus,
  UpdateStatus,
} from "./WordApi";

import { GetAllDecksByLanguage } from "./DeckApi";
import BottomContainer from "./BottomContainer";
import CardsInSetListView from "./CardsInSetListView";
import DecksBottomContainer from "./DecksBottomContainer";
import { GetCategories } from "./CategoryApi";

const Review = ({ currentLang }) => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [masterWords, setMasterWords] = useState();
  const [words, setWords] = useState([]);
  const [facingFront, setFacingFront] = useState(true);
  const [targetLang, setTargetLang] = useState(true);
  const [categories, setCategories] = useState(null);
  const [cardSetFilters, setCardSetFilters] = useState([
    "learned",
    "unsure",
    "new",
  ]);
  const [cardSet, setCardSet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [chosenLanguages, setChosenLanguages] = useState([
    "korean",
    "spanish",
    "italian",
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const title = searchParams.get("title");
  const status = searchParams.get("status");

  const colorMap = {
    Learned: "green",
    Unsure: "yellow",
    New: "red",
  };

  const timeout = (seconds) => {
    return new Promise((res) => setTimeout(res, seconds));
  };
  useEffect(() => {
    getWords();
    getCategories();
  }, []);

  useEffect(() => {
    filterByCardSet();
  }, [masterWords]);

  useEffect(() => {
    setIndex(0);
    filterByCardSet();
  }, [cardSetFilters]);

  const handleCategoryChangeClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getCategories = () => {
    GetCategories().then((cats) => {
      setCategories(cats);
    });
  };

  const filterByCardSet = () => {
    if (masterWords !== undefined) {
      const tempWords = JSON.parse(JSON.stringify(masterWords));
      let filteredWords = [];

      if (cardSetFilters.includes("new")) {
        tempWords
          .filter((x) => x.status === "New")
          .map((word) => {
            filteredWords.push(word);
          });
      }

      if (cardSetFilters.includes("unsure")) {
        tempWords
          .filter((x) => x.status === "Unsure")
          .map((word) => {
            filteredWords.push(word);
          });
      }

      if (cardSetFilters.includes("learned")) {
        tempWords
          .filter((x) => x.status === "Learned")
          .map((word) => {
            filteredWords.push(word);
          });
      }
      setWords(filteredWords);
    }
  };

  const getWords = () => {
    const wordSet = title.split(" ");

    if (wordSet.length > 1) {
      GetWordsForLanguageByStatus(currentLang, title.split(" ")[0]).then(
        (words) => {
          setMasterWords(words);
        }
      );
    } else {
      GetWordsForLanguageByCategory(currentLang, title).then((words) => {
        setMasterWords(words);
      });
    }
  };

  const listDefs = (defs) => {
    return (
      <ul>
        {defs.map((def) => (
          <li
            key={def}
            style={{
              fontSize: "20px",
              marginLeft: 0,
            }}
          >
            {def}
          </li>
        ))}
      </ul>
    );
  };

  const changeStatus = async (newStatus, word) => {
    var btn = document.getElementById("learned-btn");
    btn.classList.toggle("learned-animation");
    await timeout(1000);
    btn.classList.toggle("learned-animation");

    //UpdateStatus(newStatus, word.id);
  };

  const toggleFace = (showFront) => {
    setFacingFront(showFront);
  };

  const moveCard = async (direction) => {
    const cardId = facingFront ? "cardFront" : "cardBack";
    let card = null;
    if (direction === 1) {
      card = document.getElementById(cardId);
      card.classList.toggle("card-move-right");
      await timeout(300);
      card.classList.toggle("card-move-right");
    } else {
      card = document.getElementById(cardId);
      card.classList.toggle("card-move-left");
      await timeout(300);
      card.classList.toggle("card-move-left");
    }

    setFacingFront(targetLang);
    setIndex(index + direction);
  };

  const handleCardsetChange = (e, newCardSet) => {
    setCardSetFilters(newCardSet);
  };

  const handleMixedLanguageChange = (e, language) => {
    setChosenLanguages(language);
  };

  const changeCardSet = (cardSet) => {
    setIndex(0);
    setCardSet(cardSet);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const openModalMenu = (context) => {
    if (cardSet) {
      setOpenModal(true);
      setModal(context);
    }
  };

  const toggleTargetLanguage = () => {
    setTargetLang(!targetLang);
    setFacingFront(!facingFront);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            bgcolor: "#16594a",
            mt: 5,
            ml: 1,
            fontSize: 10,
            height: 50,
          }}
        >
          {![
            "Learned Words",
            "Unsure Words",
            "New Words",
            "Mixed Languages",
          ].includes(title) && (
            <>
              <ToggleButtonGroup
                size="small"
                value={cardSetFilters}
                onChange={handleCardsetChange}
              >
                <ToggleButton
                  sx={{
                    margin: 1,
                    fontSize: 10,
                    border: "1px solid transparent",
                    "&.Mui-selected": {
                      backgroundColor: "#f98f45",
                      borderRadius: "5px!important",
                    },
                  }}
                  value="learned"
                >
                  Learned
                </ToggleButton>
                <ToggleButton
                  sx={{
                    margin: 1,
                    fontSize: 10,
                    border: "1px solid transparent",
                    "&.Mui-selected": {
                      backgroundColor: "#f98f45",
                      borderRadius: "5px!important",
                    },
                  }}
                  value="unsure"
                >
                  Unsure
                </ToggleButton>
                <ToggleButton
                  sx={{
                    margin: 1,
                    fontSize: 10,
                    border: "1px solid transparent",
                    "&.Mui-selected": {
                      backgroundColor: "#f98f45",
                      borderRadius: "5px!important",
                    },
                  }}
                  value="new"
                >
                  New
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
          {title === "Mixed Language" && (
            <>
              <ToggleButtonGroup
                size="small"
                value={chosenLanguages}
                onChange={handleMixedLanguageChange}
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
                  value="korean"
                >
                  Korean
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
                  value="italian"
                >
                  Italian
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
                  value="spanish"
                >
                  Spanish
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
        </Paper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div>
            <label>Target Lang</label>
            <Switch onChange={toggleTargetLanguage} checked={targetLang} />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Paper
              elevation={4}
              sx={{
                mr: 2,
                mt: 1,
                py: 1,
                px: 2,
                height: 20,
                bgcolor: "#c4421a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  borderRadius: "10px",
                  margin: 0,
                  padding: "0",
                  color: "white",
                }}
                onClick={handleCategoryChangeClicked}
              >
                {title}
              </h2>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                style={{ marginTop: 10 }}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuList dense>
                  {categories &&
                    categories.map((cat) => (
                      <MenuItem key={cat}>{cat}</MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </Paper>
          </div>
        </div>
      </div>
      {facingFront && (
        <Card
          elevation={4}
          sx={{
            marginTop: 2,
            height: 200,
            width: "95%",
            borderLeftColor:
              cardSet && cardSet.words[index] !== undefined
                ? colorMap[cardSet.words[index].status]
                : "gray",
            borderLeftWidth: "10px",
            borderLeftStyle: "solid",
          }}
          id="cardFront"
        >
          <CardHeader
            title={
              <div
                style={{
                  borderRadius: "5px",
                  backgroundColor: "rgb(158, 180, 213)",
                  width: "fit-content",
                  padding: "2px 15px",
                  fontSize: 15,
                  height: 20,
                }}
                onClick={() => openModalMenu("view")}
              >
                {index + 1}/{cardSet ? cardSet.words.length : "-"}
              </div>
            }
          />
          <CardContent
            onClick={() => toggleFace(false)}
            sx={{
              display: "flex",
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-60px",
            }}
          >
            <div style={{ fontSize: "40px" }}>
              {cardSet && cardSet.words.length > 0 && cardSet.words[index].word}
            </div>
          </CardContent>
        </Card>
      )}
      {!facingFront && (
        <Card
          elevation={4}
          onClick={() => toggleFace(true)}
          sx={{
            marginTop: 2,
            height: 200,
            width: "95%",
            borderLeftColor: cardSet
              ? colorMap[cardSet.words[index].status]
              : "gray",
            borderLeftWidth: "10px",
            borderLeftStyle: "solid",
          }}
          id="cardBack"
        >
          {" "}
          <CardHeader
            title={
              <div
                style={{
                  borderRadius: "5px",
                  backgroundColor: "rgb(158, 180, 213)",
                  width: "fit-content",
                  padding: "2px 15px",
                  fontSize: 15,
                  height: 20,
                }}
                onClick={() => openModalMenu("view")}
              >
                {index + 1}/{cardSet ? cardSet.words.length : "-"}
              </div>
            }
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                overflowY: "auto",
                height: "210px",
              }}
            >
              {cardSet && listDefs(cardSet.words[index].definition.split(";"))}
            </div>
          </CardContent>
        </Card>
      )}
      <Paper
        id="flashcard-actions"
        style={{
          padding: 5,
          marginTop: 20,
          display: "flex",
          alignItems: "space-evenly",
          gap: 20,
        }}
      >
        <Button
          disabled={index === 0}
          sx={{
            "&:hover": {
              backgroundColor: "#c4421a",
            },
            bgcolor: "#c4421a",
            opacity: index > 0 ? 1 : 0.2,
          }}
          onClick={() => {
            moveCard(-1);
          }}
        >
          <ArrowBackIcon sx={{ color: "rgb(255,255,255)" }} />
        </Button>
        <IconButton
          sx={{ bgcolor: "#e3aa29", color: "rgb(255,255,255)" }}
          onClick={() => openModalMenu("edit)")}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "gray", color: "rgb(255,255,255)" }}
          onClick={() => changeStatus("Unsure", cardSet.words[index])}
        >
          <QuestionMarkIcon />
        </IconButton>
        <IconButton
          id="learned-btn"
          sx={{
            bgcolor: "green",
            color: "rgb(255,255,255)",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
          onClick={() => changeStatus("Learned", /*cardSet.words[index]*/ "f")}
        >
          <CheckIcon />
        </IconButton>
        <IconButton sx={{ bgcolor: "rgb(158, 180, 213)", color: "white" }}>
          <HistoryIcon />
        </IconButton>
        <Button
          disabled={cardSet !== null ? index >= cardSet.words.length - 1 : true}
          sx={{
            "&:hover": {
              backgroundColor: "#c4421a",
            },
            backgroundColor: "#c4421a",
            opacity:
              cardSet !== null
                ? index >= cardSet.words.length - 1
                  ? 0.2
                  : 1
                : 1,
          }}
          onClick={() => {
            moveCard(1);
          }}
        >
          <ArrowForwardIcon sx={{ color: "rgb(255,255,255)" }} />
        </Button>
      </Paper>

      <div>
        {title !== "Decks" && (
          <BottomContainer
            words={words}
            selectCardSet={changeCardSet}
            cardSetContext={title}
          />
        )}
        {title === "Decks" && (
          <DecksBottomContainer
            language={currentLang}
            status="New"
            selectCardSet={changeCardSet}
          />
        )}
      </div>
      <Modal
        open={openModal}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          {modal === "edit" && (
            <EditWord currentLang={currentLang} onCancel={closeModal} />
          )}
          {modal === "view" && (
            <CardsInSetListView closeModal={closeModal} words={cardSet.words} />
          )}
        </>
      </Modal>
      {/* <Fab
        sx={{ position: "absolute", bottom: 16, right: 16, bgcolor: "#c4421a" }}
      >
        <ShuffleIcon />
      </Fab> */}
    </div>
  );
};
export default Review;
