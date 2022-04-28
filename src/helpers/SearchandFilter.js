import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const SearchandFilter = ({ skills }) => {
  const [values, setValues] = useState({
    search: "",
  });

  const handleChange = (name, skills) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    console.log(searchFunction(skills, event.target.value));
  };

  const searchFunction = (exerciseArray, searchString) => {
    //Gotta make sure that this is case sensitive
    searchString = searchString.toLowerCase();
    const searchResults = exerciseArray.filter((exercise) => {
      if (exercise.exercise.toLowerCase().includes(searchString)) {
        return exercise;
      }
    });
    return searchResults;
  };

  const alphabetizeFunction = (exerciseArray) => {
    const newExerciseArray = exerciseArray.sort((x, y) => {
      if (x.exercise.toLowerCase() < y.exercise.toLowerCase()) {
        return -1;
      }
      if (x.exercise.toLowerCase() > y.exercise.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    console.log(newExerciseArray);
  };

  const orderBasedOnDifficulty = (exerciseArray) => {
    const newExerciseArray = exerciseArray.sort((x, y) => {
      if (x.diff < y.diff) {
        return -1;
      }
      if (x.diff > y.diff) {
        return 1;
      }
      return 0;
    });

    console.log(newExerciseArray);
  };

  const orderBasedOnLockedStatus = (exerciseArray) => {
    const newExerciseArray = exerciseArray.sort((x) => {
      if (x.locked === true) {
        return -1;
      }
      if (x.locked === false) {
        return 1;
      }
      return 0;
    });

    console.log(newExerciseArray)
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "normal" },
        mb: 10,
      }}
    >
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          value={values.search}
          onChange={handleChange("search", skills)}
        />
      </Box>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => alphabetizeFunction(skills)}>A-Z</Button>
        <Button onClick={() => orderBasedOnDifficulty(skills)}>
          Difficulty
        </Button>
        <Button onClick={() => orderBasedOnLockedStatus(skills)}>Locked</Button>
      </ButtonGroup>
    </Box>
  );
};

export default SearchandFilter;
