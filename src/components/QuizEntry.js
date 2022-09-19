import React from "react";

import {
  Box,
  Divider,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const parse = require("html-react-parser");

export default function QuizEntry({ index, questionData, handleOptionClick, isQuizOpen }) {
  return (
    <Box className="quizEntryContainer" sx={{ width: "100%", height: "100%", my: 0 }}>
      <Typography variant="h4" sx={{ color: "primary.dark", textAlign: "center" }}>
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
          onChange={(e) => isQuizOpen && handleOptionClick(e, index)}
          sx={{my: 2}}
        >
          {questionData.shuffled_answers.map((option, i) => {
            return (
              <ToggleButton key={i} value={option}>
                {parse(option)}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
      <Divider sx={{my: 1}} />
    </Box>
  );
}
