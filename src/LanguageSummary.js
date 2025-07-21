import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CategoriesGraph from "./CategoriesGraph";
import { GetCategories } from "./CategoryApi";
import { GetWordsForLanguage } from "./WordApi";

const LanguageSummary = ({ language }) => {
  const [graphData, setGraphData] = useState(null);
  const [categoriesTotalCount, setCategoriesTotalCount] = useState(0);
  const [wordCounts, setWordCounts] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    getCategories();
  };

  const getCategories = () => {
    GetCategories().then((cats) => {
      let categories = [];
      let count = 0;

      cats.forEach((cat) => {
        categories.push({ name: cat, count: 0 });
      });

      GetWordsForLanguage(language).then((words) => {
        let learned = 0;
        let unsure = 0;
        let newWords = 0;

        words.forEach((word) => {
          switch (word.status) {
            case "New":
              newWords++;
              break;
            case "Learned":
              learned++;
              break;
            case "Unsure":
              unsure++;
              break;
          }
          updateCount(word.category, categories);
        });

        categories.forEach((cats) => {
          count += cats.count;
        });

        categories = categories.sort(({ count: a }, { count: b }) => b - a);

        setCategoriesTotalCount(count);
        setGraphData(categories);
        setWordCounts({
          newWords: newWords,
          learned: learned,
          unsure: unsure,
        });
      });
    });
  };

  const updateCount = (wordCategory, categories) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === wordCategory) {
        categories[i].count++;
      }
    }
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        {language}
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ margintop: 0 }}>
          <Chip
            sx={{
              bgcolor: "#16594a",
              fontSize: 10,
              mr: 1,
              color: "rgb(255,255,255)",
              border: "2px solid #c4421a",
            }}
            label={
              wordCounts &&
              `Total: ${
                wordCounts.newWords + wordCounts.learned + wordCounts.unsure
              }`
            }
          ></Chip>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              fontSize: 11,
              mr: 1,
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={wordCounts && `Learned: ${wordCounts.learned}`}
          ></Chip>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              fontSize: 11,
              mr: 1,
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={wordCounts && `Unsure: ${wordCounts.unsure}`}
          ></Chip>
          <Chip
            sx={{
              bgcolor: "#c4421a",
              fontSize: 11,
              mr: 1,
              color: "rgb(255,255,255)",
              border: "2px solid #16594a",
            }}
            label={wordCounts && `New: ${wordCounts.newWords}`}
          ></Chip>
        </div>
        <Paper
          elevation={3}
          style={{
            marginTop: 10,
            height: 400,
            width: "98%",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          {" "}
          <CategoriesGraph
            graphData={graphData}
            totalCategoriesCount={categoriesTotalCount}
          />
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default LanguageSummary;
