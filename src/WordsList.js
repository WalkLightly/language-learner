import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  ListItem,
  List,
  MenuItem,
  Menu,
  ListItemText,
  Paper,
  IconButton,
  Chip,
  Divider,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditWord from "./EditWord";
import DeleteWord from "./DeleteWord";
import { GetWordsForLanguage, DeleteWordById } from "./WordApi";
import CategoriesGraphCard from "./CategoriesGraphCard";
import DecksList from "./DecksList";
import RefreshIcon from "@mui/icons-material/Refresh";

const WordsList = ({ currentLang }) => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("Korean");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("Categories");
  const [selectedWord, setSelectedWord] = useState("");
  const open = Boolean(anchorEl);
  const [results, setResults] = useState(null);
  const [bottomToggleSection, setBottomToggleSection] = useState("words");

  const colorMap = {
    Learned: "green",
    Unsure: "yellow",
    New: "red",
  };

  useEffect(() => {
    getWordsList();
  }, []);

  useEffect(() => {
    getWordsList();
  }, [currentLang]);

  const searchForWord = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMenu = (e, word) => {
    setSelectedWord(word);
    setAnchorEl(e.currentTarget);
  };

  const closeModal = (refetch = false) => {
    setOpenModal(false);
    handleClose();

    if (refetch) {
      getWordsList();
    }
  };

  const openModalClose = (e, modal) => {
    setModal(modal);
    setOpenModal(false);
  };
  const deleteWord = (id) => {
    DeleteWordById(id);
    setSearch("");
    closeModal();
  };
  const openModalMenu = (e, context) => {
    setModal(context);
    setOpenModal(true);
  };

  const getWordsList = () => {
    GetWordsForLanguage(currentLang).then((words) => {
      setResults(words);
    });
  };

  const handleBottomToggleChange = (e, buttonToggle) => {
    setBottomToggleSection(buttonToggle);
  };

  return (
    <>
      <Box style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            marginLeft: 10,
            marginTop: 5,
            display: "flex",
            gap: 5,
          }}
        >
          <Paper
            sx={{
              bgcolor: "#16594a",
              width: "fit-content",
              height: 40,
            }}
          >
            <ToggleButtonGroup
              size="small"
              style={{ height: 40 }}
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
                value="words"
              >
                Words
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
                value="card-sets"
              >
                Card Sets
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
          <Button variant="contained">
            <RefreshIcon style={{ color: "white" }} />
          </Button>
        </div>
      </Box>
      <div id="effect"></div>
      <div
        id="wordsList"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "73vh",
        }}
      >
        <TextField
          value={search}
          sx={{
            height: "40px",
            width: "95%",
            marginTop: 5,
            border: "1px solid #f98f45",
            borderRadius: "5px",
            "& fieldset": { border: "none" },
            display: "flex",
            justifyContent: "center",
          }}
          onChange={searchForWord}
        />
        <div style={{ width: "100%", marginTop: 10 }}>
          <div style={{ alignSelf: "center", marginLeft: 10 }}>
            Total words: {results && results.length}
          </div>
        </div>
        <div style={{ marginTop: 5, width: "95%" }}>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              mr: 0.5,
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={`New: ${
              results ? results.filter((x) => x.status === "New").length : 0
            }`}
          ></Chip>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              mr: 0.5,
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={`Unsure: ${
              results ? results.filter((x) => x.status === "Unsure").length : 0
            }`}
          ></Chip>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={`Learned: ${
              results ? results.filter((x) => x.status === "Learned").length : 0
            }`}
          ></Chip>
          <Button
            size="small"
            onClick={() => openModalMenu(null, "Categories")}
            sx={{
              backgroundColor: "rgb(93, 112, 140)",
              color: "black",
              ml: 1,
              p: 1,
              fontSize: 15,
            }}
          >
            categories
          </Button>
        </div>
        <div id="results-container">
          {!results && (
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
              <Skeleton variant="rectangular" width={370} height={30} />
            </div>
          )}
          {results && bottomToggleSection === "words" && (
            <List sx={{ borderRadius: "5px" }} className="results-item">
              {results
                .filter((word) =>
                  word.word.toLowerCase().includes(search.toLowerCase())
                )
                .map((result, index) => (
                  <React.Fragment key={result.word}>
                    <ListItem
                      style={{
                        height: "30px",
                        borderLeft: `4px solid ${colorMap[result.status]}`,
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={(e) => openMenu(e, result)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
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
          {results && bottomToggleSection !== "words" && (
            <DecksList currentLang={currentLang} />
          )}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={(e) => openModalMenu(e, "Edit")}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div>Edit</div>
              <EditIcon sx={{ color: "gray" }} />
            </MenuItem>
            <MenuItem
              onClick={(e) => openModalMenu(e, "Delete")}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
              }}
            >
              <div>Delete</div>
              <DeleteIcon sx={{ color: "gray" }} />
            </MenuItem>
          </Menu>
          <Modal
            open={openModal}
            onClose={closeModal}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {modal === "Edit" && (
                <EditWord
                  currentLang={currentLang}
                  closeModal={closeModal}
                  selectedWord={selectedWord}
                />
              )}
              {modal === "Delete" && (
                <DeleteWord
                  onCancel={closeModal}
                  onDelete={deleteWord}
                  word={selectedWord}
                />
              )}
              {modal === "Categories" && (
                <CategoriesGraphCard
                  onCancel={closeModal}
                  language={currentLang}
                />
              )}
            </>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default WordsList;
