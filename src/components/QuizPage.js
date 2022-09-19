import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
import QuizEntry from "./QuizEntry";

const _ = require("lodash");
const parse = require("html-react-parser");

export default function QuizPage() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    getQuiz().then((response) => {
      const data = response.results.map((result, i) => {
        const options = [...result.incorrect_answers];
        options.push(result.correct_answer);
        const shuffledOptions = _.shuffle(options);
        return {
          ...result,
          selected_answer: "",
          shuffled_answers: shuffledOptions,
          index: i,
        };
      });
      setQuizData(data);
    });
  }, []);

  function getQuiz() {
    return fetch("https://opentdb.com/api.php?amount=5&type=multiple").then(
      (response) => response.json()
    );
  }

  function handleOptionClick(e, index) {
    setQuizData((oldQuizData) =>
      oldQuizData.map((questionData) => {
        if (index === questionData.index) {
          return {
            ...questionData,
            selected_answer:
              questionData.selected_answer ? (e.target.textContent === parse(questionData.selected_answer)
                ? ""
                : e.target.value) : e.target.value,
          };
        } else {
          return questionData;
        }
      })
    );
  }

  return (
    <Box
      className="quizPage"
      sx={{ p: 6 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {quizData.map((questionData, i) => {
        return (
          <QuizEntry
            key={i}
            index={i}
            questionData={questionData}
            handleOptionClick={handleOptionClick}
          />
        );
      })}
    </Box>
  );
}
