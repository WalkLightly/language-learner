import { useState, React, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
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
  InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GetCategories } from "./CategoryApi";
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "./firebase";

const NewWord = ({ currentLang, onCancel }) => {
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState(currentLang);
  const [newWord, setNewWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [definition, setDefinition] = useState("");
  const [status, setStatus] = useState("New");
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    getCategories();
    getLanguages();
  }, []);

  const getLanguages = async () => {
    const querySnapshot = await getDocs(collection(db, "language"));
    let langs = [];
    querySnapshot.forEach((lang) => {
      langs.push(lang.data().name);
    });

    setLanguages([...langs]);
  };

  const clearInputs = () => {
    setNewWord("");
    setDefinitions("");
    setDefinitions([]);
    setStatus("New");
    setNumberValue("");
  };

  const handleNumberInput = (e) => {
    setNumberValue(e.target.value);
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

  const saveWord = async () => {
    await addDoc(collection(db, "words"), {
      category: category,
      definition: definitions.join(";"),
      goodTimes: 0,
      unsureTimes: 0,
      language: language,
      status: status,
      word: newWord,
      deckId: "",
      numberValue: category === "Number" ? numberValue : "",
    });

    clearInputs();
  };
  const getCategories = () => {
    GetCategories().then((cats) => {
      setCategories(cats);
    });
  };

  const initData = () => {
    getCategories();
  };

  return (
    <Card sx={{ width: "90%", height: "fit-content", bgcolor: "#cfcfcf" }}>
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="New Word"
      />
      <CardContent>
        <FormControl>
          <RadioGroup row>
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
              value="Learned"
              control={
                <Radio
                  onChange={handleStatusChange}
                  checked={status === "Learned"}
                />
              }
              label="Learned"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Word"
          variant="standard"
          value={newWord}
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
          <Select
            variant="standard"
            value={category}
            onChange={changeCategory}
            placeholder="Category"
          >
            {categories.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            mt: 2,
            width: "30%",
            borderRadius: "5px",
          }}
        >
          <InputLabel>LANG</InputLabel>
          <Select variant="standard" value={language} onChange={changeLanguage}>
            {languages.map((language) => (
              <MenuItem value={language} key={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {category === "Number" && (
          <TextField
            label="Number"
            variant="standard"
            value={numberValue}
            sx={{ width: "25%" }}
            onChange={handleNumberInput}
          />
        )}
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
          {definitions.map((def) => (
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
          onClick={onCancel}
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

export default NewWord;
