import { useState, React, useEffect } from "react";
import {
  IconButton,
  Paper,
  Select,
  Box,
  Divider,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import Review from "./Review";
import WordsList from "./WordsList";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";
import LanguageSummaries from "./LanguageSummaries";
import BookmarkedWords from "./RecentItems";
import RecentItems from "./RecentItems";

function App() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const drawerOptions = [
    {
      name: "Search",
      url: "/words-list",
      icon: <SearchIcon />,
    },
    { name: "Settings", url: "", icon: <SettingsIcon /> },
    {
      name: "Languages Stats",
      url: "language-summaries",
      icon: <AssessmentIcon />,
    },
    {
      name: "Bookmarked Words",
      url: "bookmarked-words",
      icon: <BookmarkIcon />,
    },
  ];

  useEffect(() => {
    initData();
  }, []);

  const changeLanguage = (e) => {
    localStorage.setItem("language", e.target.value);
    setLanguage(e.target.value);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const initData = () => {
    const chosenLanguage = localStorage.getItem("language");
    if (chosenLanguage !== null) {
      setLanguage(chosenLanguage);
    } else {
      setLanguage("Italian");
      localStorage.setItem("language", "Italian");
    }
    getLanguages();
  };

  const getLanguages = async () => {
    const querySnapshot = await getDocs(collection(db, "language"));
    let langs = [];
    querySnapshot.forEach((lang) => {
      langs.push(lang.data().name);
    });

    setLanguages([...langs]);
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => navigate("/")}>
          <TranslateIcon fontSize="large" sx={{ color: "rgb(255,255,255)" }} />
        </IconButton>
        <Paper
          elevation={2}
          sx={{
            width: "fit-content",
            borderRadius: "10px",
            mt: 3,
            height: "fit-content",
            bgcolor: "#16594a",
            padding: "2px 10px",
          }}
        >
          <Select
            variant="standard"
            value={language}
            onChange={changeLanguage}
            disableUnderline
            sx={{
              padding: "3px 5px",
              width: "100%",
              color: "rgb(255,255,255)",
              borderRadius: "5px",
            }}
          >
            {languages.map((language) => (
              <MenuItem value={language} key={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer
          id="drawer-navigation"
          open={openDrawer}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: "rgb(158, 180, 213, 0.3) !important",
              backdropFilter: "blur(15px)",
            },
          }}
        >
          <Box width={300} id="navigation-drawer-box">
            <List>
              {drawerOptions.map((option, index) => (
                <ListItem key={option.name} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setOpenDrawer(false);
                      navigate(option.url);
                    }}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Routes>
        <Route index element={<Homepage currentLang={language} />}></Route>
        <Route
          path="review"
          element={<Review currentLang={language} />}
        ></Route>
        <Route
          path="recent-items"
          element={<RecentItems currentLang={language} />}
        ></Route>
        <Route
          path="words-list"
          element={<WordsList currentLang={language} />}
        ></Route>
        <Route
          path="language-summaries"
          element={<LanguageSummaries />}
        ></Route>
        {/* <Route path="bookmarked-words" element={<BookmarkedWords />}></Route> */}
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
