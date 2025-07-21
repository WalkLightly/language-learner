import { Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import LanguageSummary from "./LanguageSummary";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

const LanguageSummaries = () => {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100vw",
        marginTop: 5,
      }}
    >
      <Card id="language-summary">
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            overflowY: "auto",
            height: 770,
          }}
        >
          {languages &&
            languages.map((language) => (
              <LanguageSummary language={language} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSummaries;
