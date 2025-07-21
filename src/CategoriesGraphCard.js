import {
  Card,
  Divider,
  Button,
  CardActions,
  CardHeader,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoriesGraph from "./CategoriesGraph";
import { GetCategories } from "./CategoryApi";
import { GetWordsForLanguage } from "./WordApi";

const CategoriesGraphCard = ({ onCancel, language }) => {
  const [graphData, setGraphData] = useState(null);
  const [categoriesTotalCount, setCategoriesTotalCount] = useState(0);

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
        words.forEach((word) => {
          updateCount(word.category, categories);
        });

        categories.forEach((cats) => {
          count += cats.count;
        });

        categories = categories.sort(({ count: a }, { count: b }) => b - a);

        setCategoriesTotalCount(count);
        setGraphData(categories);
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
    <Card
      sx={{
        height: "fit-content",
        width: "95vw",
        height: "98vh",
        bgcolor: "#cfcfcf",
      }}
    >
      <CardHeader
        sx={{ bgcolor: "rgb(158, 180, 213)", height: 15, color: "black" }}
        title="Category Beakdown"
      />
      <CardContent style={{ height: "85%", overflowY: "auto" }}>
        <CategoriesGraph
          graphData={graphData}
          totalCategoriesCount={categoriesTotalCount}
        />
      </CardContent>
      <Divider />
      <CardActions
        sx={{ display: "flex", width: "95%", justifyContent: "flex-end" }}
      >
        <Button
          sx={{ bgcolor: "#97cecc", color: "rgb(255,255,255)" }}
          onClick={onCancel}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoriesGraphCard;
