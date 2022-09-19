import React from "react";

import {
  Box,
  Divider,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const parse = require("html-react-parser");

export default function QuizEntry({
  index,
  questionData,
  handleOptionClick,
  isQuizOpen,
}) {
  return (
    <Box
      className="quizEntryContainer"
      sx={{ width: "100%", height: "100%", my: 2 }}
    >
      <Typography
        variant="h4"
        sx={{ color: "primary.main", textAlign: "center" }}
      >
        {parse(questionData.question)}
      </Typography>
      <Box
        className="quizOptions"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <ToggleButtonGroup
          exclusive
          value={questionData.selected_answer}
          onChange={(e) => handleOptionClick(e, index)}
          sx={{
            my: 2,
          }}
          disabled={!isQuizOpen}
        >
          {questionData.shuffled_answers.map((option, i) => {
            return (
              <ToggleButton
                key={i}
                value={option}
                variant="outline"
                sx={{
                  color: "grey.900",
                  backgroundColor: isQuizOpen
                    ? "grey.50"
                    : option === questionData.correct_answer
                    ? "success.light"
                    : "grey.50",
                  "&.Mui-selected": {
                    backgroundColor: isQuizOpen
                      ? "primary.light"
                      : option === questionData.correct_answer
                      ? "success.light"
                        : "warning.light",
                    fontWeight: 700
                  },
                  "&.Mui-selected:hover": { backgroundColor: "primary.light" },
                  textTransform: "capitalize",
                  fontSize: 20,
                }}
              >
                {parse(option)}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
      <Divider sx={{ marginTop: 3 }} />
    </Box>
  );
}
