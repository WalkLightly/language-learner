import { useState, React, useEffect } from "react";
import {
  MenuItem,
  Button,
  Menu,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Modal,
  Box,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HistoryIcon from "@mui/icons-material/History";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import StyleIcon from "@mui/icons-material/Style";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TuneIcon from "@mui/icons-material/Tune";
import NewWord from "./NewWord";
import NewLanguage from "./NewLanguage";
import NewCategory from "./NewCategory";
import AddDeck from "./AddDeck";
import { useNavigate } from "react-router-dom";
import { GetCategories } from "./CategoryApi";

const Homepage = ({ currentLang }) => {
  const actions = [
    { icon: <AddIcon />, name: "Category" },
    { icon: <AddIcon />, name: "Word" },
    { icon: <AddIcon />, name: "Language" },
    { icon: <AddIcon />, name: "Deck" },
    { icon: <AddIcon />, name: "To Learn" },
  ];

  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const openModalMenu = (e, context) => {
    console.log("clicked");
    setOpenModal(true);
    setModal(context);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const reviewWords = (title) => {
    navigate(`/review?title=${encodeURIComponent(title)}`);
  };

  const reviewRecent = () => {
    navigate("/recent-items");
  };

  const getCategories = () => {
    GetCategories().then((data) => {
      setCategories(data);
    });
  };

  return (
    <>
      <div>
        <Box
          style={{
            flexDirection: "column",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="home-option-row">
            <Button
              onClick={openMenu}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <CategoryIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>By Category</h5>
            </Button>
            <Button
              onClick={() => reviewWords("New Words")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <AutoAwesomeIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>New Words</h5>
            </Button>
          </div>
          <div className="home-option-row">
            <Button
              onClick={() => reviewWords("Unsure Words")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <QuestionMarkIcon
                sx={{ fontSize: "120px", color: "#c4421aa8" }}
              />
              <h5 style={{ marginTop: "-5px" }}>Unsure Words</h5>
            </Button>
            <Button
              onClick={() => reviewWords("Learned Words")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <CheckIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>Learned Words</h5>
            </Button>
          </div>
          <div className="home-option-row">
            <Button
              onClick={() => reviewWords("Random Mix")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ShuffleIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>Random Learning</h5>
            </Button>
            <Button
              onClick={() => reviewWords("Mixed Languages")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TuneIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>Mixed Languages</h5>
            </Button>
          </div>
          <div className="home-option-row">
            <Button
              onClick={reviewRecent}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <HistoryIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>Recent</h5>
            </Button>
            <Button
              onClick={() => reviewWords("Decks")}
              className="home-option"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <StyleIcon sx={{ fontSize: "120px", color: "#c4421aa8" }} />
              <h5 style={{ marginTop: "-5px" }}>Decks</h5>
            </Button>
          </div>
        </Box>
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={(e) => openModalMenu(e, action.name)}
            />
          ))}
        </SpeedDial>
        <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
          {categories.map((cat) => (
            <MenuItem key={cat} onClick={() => reviewWords(cat)}>
              {cat}
            </MenuItem>
          ))}
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
          <div>
            {modal === "Word" && (
              <NewWord currentLang={currentLang} onCancel={closeModal} />
            )}
            {modal === "Category" && (
              <NewCategory currentLang={currentLang} onCancel={closeModal} />
            )}
            {modal === "Language" && (
              <NewLanguage currentLang={currentLang} onCancel={closeModal} />
            )}
            {modal === "Deck" && <AddDeck onCancel={closeModal} />}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Homepage;
