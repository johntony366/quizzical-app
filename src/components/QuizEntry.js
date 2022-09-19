import React from "react";

import {
  Box,
  Divider,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const parse = require("html-react-parser");

export default function QuizEntry({ index, questionData, handleOptionClick }) {
  return (
    <Box className="quizEntry" sx={{ height: "100%" }}>
      <Typography variant="h4" sx={{ color: "primary.dark" }}>
        {parse(questionData.question)}
      </Typography>
      <Box className="quizOptions">
        <ToggleButtonGroup
          exclusive
          value={questionData.selected_answer}
          onChange={(e) => handleOptionClick(e, index)}
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
      <Divider />
    </Box>
  );
}
