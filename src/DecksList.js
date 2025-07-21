import { useState, React, useEffect } from "react";
import { GetAllDecksByLanguage } from "./DeckApi";
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
import TransferDecksModal from "./TransferDecksModal";

const DecksList = ({ currentLang }) => {
  const [decks, setDecks] = useState(null);
  const [loadingDecks, setLoadingDecks] = useState(true);
  const [transferMode, setTransferMode] = useState(false);
  const [decksToTransfer, setDecksToTransfer] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const colorMap = {
    Learned: "green",
    Unsure: "yellow",
    New: "red",
  };

  useEffect(() => {
    getDeckData();
  }, []);

  useEffect(() => {
    getDeckData();
  }, [currentLang]);

  const handleClick = (event, deck) => {
    setSelectedDeck(deck.id);
    if (!transferMode) {
      setAnchorEl(event.currentTarget);
    } else {
      var decksToTransferLocal = [];

      if (decksToTransfer.length === 1) {
        decksToTransferLocal = [decksToTransfer[0], deck.id];
      } else if (decksToTransfer.length === 2) {
        decksToTransferLocal = [decksToTransfer[1], deck.id];
      } else if (decksToTransfer.length === 0) {
        decksToTransferLocal = [deck.id];
      }

      setDecksToTransfer(decksToTransferLocal);
    }
  };

  const toggleTransferModal = () => {
    setTransferMode(false);
    setShowTransferModal(true);
  };

  const cancelTransfer = () => {
    setSelectedDeck("");
    setDecksToTransfer([]);
    setTransferMode(false);
  };

  const handleClose = (action, deckId = null) => {
    if (action === "transfer") {
      setTransferMode(true);
      setDecksToTransfer([selectedDeck]);
    } else if (action === "delete") {
    } else {
    }
    setAnchorEl(null);
  };

  const getDeckData = () => {
    setLoadingDecks(true);
    setShowTransferModal(false);
    setDecksToTransfer([]);
    GetAllDecksByLanguage(currentLang).then((data) => {
      setDecks(data);
      setLoadingDecks(false);
    });
  };

  return (
    <>
      {transferMode && (
        <Box
          style={{
            display: "flex",
            gap: 5,
            position: "fixed",
            top: "67px",
            left: 215,
          }}
        >
          <Button
            variant="contained"
            style={{
              height: 40,
              marginTop: 13,
              backgroundColor: "#97cecc",
              color: "black",
            }}
            onClick={cancelTransfer}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              height: 40,
              marginTop: 13,
              backgroundColor: "purple",
            }}
            onClick={toggleTransferModal}
          >
            TRANSFER
          </Button>
        </Box>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {!loadingDecks &&
          decks &&
          decks.map((deck) => (
            <div
              id={deck.id}
              key={deck.id}
              className={
                decksToTransfer.includes(deck.id) ? "active-transfer" : ""
              }
            >
              <Paper
                onClick={(e) => {
                  handleClick(e, deck);
                }}
                style={{
                  width: "120px",
                  height: "120px",
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
                className={
                  decksToTransfer.includes(deck.id) ? "active-transfer" : ""
                }
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
        {loadingDecks && (
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
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} />
          </div>
        )}
      </div>
      <Modal
        open={showTransferModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <TransferDecksModal
            topDeckId={decksToTransfer[0]}
            bottomDeckId={decksToTransfer[1]}
            closeModal={() => {
              getDeckData();
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default DecksList;
