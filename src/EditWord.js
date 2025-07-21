import { useState, useEffect, React } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  InputLabel,
  TextField,
  Select,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  MenuItem,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GetCategories } from "./CategoryApi";
import { UpdateWord } from "./WordApi";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "./firebase";

const EditWord = ({ currentLang, closeModal, selectedWord }) => {
  const [languages, setLanguages] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState();
  const [language, setLanguage] = useState();
  const [newWord, setNewWord] = useState(null);
  const [definitions, setDefinitions] = useState(null);
  const [definition, setDefinition] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getCategories();
    getLanguages();
    setNewWord(selectedWord.word);
    setCategory(selectedWord.category);
    setDefinitions(selectedWord.definition.split(";"));
    setLanguage(selectedWord.language);
    setStatus(selectedWord.status);
  }, [selectedWord]);

  const getCategories = () => {
    GetCategories().then((cats) => {
      setCategories(cats);
    });
  };

  const getLanguages = async () => {
    const querySnapshot = await getDocs(collection(db, "language"));
    let langs = [];
    querySnapshot.forEach((lang) => {
      langs.push(lang.data().name);
    });

    setLanguages([...langs]);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleInput = (e) => {
    setNewWord(e.target.value);
  };
  const handleDefinitionInput = (e) => {
    setDefinition(e.target.value);
  };
  const removeDefinition = (def) => {
    let defs = definitions.filter((x) => x !== def);
    setDefinitions(defs);
  };

  const addDefinition = () => {
    let newDefs = [...definitions, definition];

    setDefinitions(newDefs);
    setDefinition("");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const saveWord = () => {
    const wordToEdit = {
      id: selectedWord.id,
      category: category,
      definition: definitions.join(";"),
      status: status,
      word: newWord,
      language: language,
    };

    UpdateWord(wordToEdit);
    closeModal(true);
  };

  return (
    <Card sx={{ width: "90%", height: "fit-content", bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{
          bgcolor: "rgb(158, 180, 213)",
          height: 15,
          color: "black",
        }}
        title="Edit Word"
      />
      <CardContent>
        <FormControl>
          <RadioGroup row>
            <FormControlLabel
              value="Learned"
              control={
                <Radio
                  onChange={handleStatusChange}
                  checked={status === "Learned"}
                />
              }
              label="Learned"
            />
            <FormControlLabel
              value="Unsure"
              control={
                <Radio
                  onChange={handleStatusChange}
                  checked={status === "Unsure"}
                />
              }
              label="Unsure"
            />
            <FormControlLabel
              value="New"
              control={
                <Radio
                  onChange={handleStatusChange}
                  checked={status === "New"}
                />
              }
              label="New"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          variant="standard"
          value={newWord ?? null}
          sx={{ width: "95%", marginTop: 5 }}
          onChange={handleInput}
        />
        <FormControl
          sx={{
            mt: 2,
            width: "60%",
            borderRadius: "5px",
            mr: 1,
          }}
        >
          <InputLabel>Category</InputLabel>
          {category && (
            <Select
              variant="standard"
              value={category}
              onChange={changeCategory}
              placeholder="Category"
            >
              {categories &&
                categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          )}
        </FormControl>
        <FormControl
          sx={{
            mt: 2,
            width: "30%",
            borderRadius: "5px",
            mr: 1,
          }}
        >
          <InputLabel>LANG</InputLabel>
          {language && (
            <Select
              variant="standard"
              value={language}
              onChange={changeLanguage}
            >
              {languages &&
                languages.map((language) => (
                  <MenuItem value={language} key={language}>
                    {language}
                  </MenuItem>
                ))}
            </Select>
          )}
        </FormControl>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: "20px",
            alignItems: "flex-end",
          }}
        >
          <TextField
            label="Definition"
            variant="standard"
            value={definition}
            sx={{ width: "60%" }}
            onChange={handleDefinitionInput}
          />
          <Button
            onClick={addDefinition}
            sx={{
              bgcolor: "#22bf44",
              color: "rgb(255,255,255)",
              height: "fit-content",
            }}
          >
            Add
          </Button>
        </div>
        <List>
          {definitions &&
            definitions.map((def) => (
              <ListItem
                key={def}
                sx={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {" "}
                  <div> {def}</div>
                  <div></div>
                </div>
                <ClearIcon
                  onClick={() => {
                    removeDefinition(def);
                  }}
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions
        sx={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          sx={{ bgcolor: "#12908E", color: "rgb(255,255,255)" }}
          onClick={saveWord}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditWord;
