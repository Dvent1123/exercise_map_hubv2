import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const SearchandFilter = ({ skills, setData, defaultData }) => {
  const [values, setValues] = useState({
    search: "",
  });

  const handleChange = (name, skills) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    const results = searchFunction(skills, event.target.value);
    setData(results);
  };

  const searchFunction = (exerciseArray, searchString) => {
    //Gotta make sure that this is case sensitive
    searchString = searchString.toLowerCase();
    const searchResults = exerciseArray.filter((exercise) => {
      if (exercise.exercise.toLowerCase().includes(searchString)) {
        return exercise;
      }
    });

    if (searchString.length > 1) {
      return searchResults;
    } else {
      return defaultData;
    }
  };

  const alphabetizeFunction = (exerciseArray) => {
    const newExerciseArray = [...exerciseArray].sort((x, y) => {
      if (x.exercise.toLowerCase() < y.exercise.toLowerCase()) {
        return -1;
      }
      if (x.exercise.toLowerCase() > y.exercise.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    setData(newExerciseArray);
  };

  const orderBasedOnDifficulty = (exerciseArray) => {
    const newExerciseArray = [...exerciseArray].sort((x, y) => {
      if (x.diff < y.diff) {
        return -1;
      }
      if (x.diff > y.diff) {
        return 1;
      }
      return 0;
    });

    setData(newExerciseArray);
  };

  const orderBasedOnLockedStatus = (exerciseArray) => {
    const newExerciseArray = [...exerciseArray].sort((x) => {
      if (x.locked === true) {
        return -1;
      }
      if (x.locked === false) {
        return 1;
      }
      return 0;
    });

    setData(newExerciseArray);
  };

  return (
    <Container
      sx={{
        width: "80vw",
        margin: "auto"
      }}
    >
      <Box
        sx={{
          maxWidth: "80vw",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "normal" },
          mb: 10,
        }}
      >
        <Box
          sx={{
            width: 650,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Search"
            id="fullWidth"
            value={values.search}
            onChange={handleChange("search", skills)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => alphabetizeFunction(skills)}>
              <SortByAlphaIcon />
            </Button>
          <Button onClick={() => orderBasedOnDifficulty(skills)}>
            <SortIcon sx={{fontSize: "medium"}}/>
            Difficulty
          </Button>
          <Button onClick={() => orderBasedOnLockedStatus(skills)}>
            <LockOpenIcon sx={{fontSize: "medium"}}/>
            Locked
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default SearchandFilter;
