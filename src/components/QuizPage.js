import React, { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import QuizEntry from "./QuizEntry";

const _ = require("lodash");
const parse = require("html-react-parser");

export default function QuizPage({ isGameRunning, toggleIsGameRunning }) {
  const [quizData, setQuizData] = useState([]);
  const [isQuizOpen, setIsQuizOpen] = useState(true);

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
            selected_answer: questionData.selected_answer
              ? e.target.textContent === parse(questionData.selected_answer)
                ? ""
                : e.target.value
              : e.target.value,
          };
        } else {
          return questionData;
        }
      })
    );
  }

  function getScore() {
    let score = 0;
    quizData.forEach((questionData) => {
      if (questionData.selected_answer === questionData.correct_answer) {
        ++score;
      }
    });
    return score;
  }

  function handleSubmit() {
    setIsQuizOpen(false);
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
            handleOptionClick={isQuizOpen && handleOptionClick}
            isQuizOpen={isQuizOpen}
          />
        );
      })}
      {isQuizOpen ? (
        <Button
          variant="contained"
          className="submitAnswersButton"
          sx={{ fontSize: 32, my: 4 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      ) : (
        <Box className="gameResultContainer" display="flex" justifyContent="center" alignItems="center" gap={4} marginTop={5}>
            <Typography variant="h4">Your score is {getScore()}</Typography>
            <Button variant="contained" sx={{fontSize: 24}}>Play again</Button>
        </Box>
      )}
    </Box>
  );
}
