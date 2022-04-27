import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import axios from "axios";
import { isAuth, getCookie, signout } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Cali from "../helpers/Cali";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WidgetSummary from "../helpers/WidgetSummary";
import BarGraph from "../helpers/BarGraph";
import PieChart from "../helpers/PieChart";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const PrivateHome = ({ history }) => {
  const [exerciseData, setExerciseData] = useState(null);
  const [unlockedExercises, setUnlockedExercises] = useState(null);
  const [totalUnlocked, setTotalUnlocked] = useState(0);

  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    typeOfAthlete: "",
    weight: 0,
    sex: "M",
    personalRecords: [],
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("private profile", res);
        const {
          role,
          name,
          email,
          exercises,
          typeOfAthlete,
          weight,
          personalRecords,
          sex,
        } = res.data;
        setValues({
          role,
          name,
          email,
          typeOfAthlete,
          weight,
          personalRecords,
          sex,
        });
        //function to filter out exercises based on athlete type
        let athleteExercises = filteredSkillArrayByAthlete(
          exercises,
          typeOfAthlete
        );
        setExerciseData(athleteExercises);
        //returns a new array with number of exercises unlocked relative to array index
        let unlockedExercisesByDifficulty =
          calculateUnlockedExercises(athleteExercises);
        setUnlockedExercises(unlockedExercisesByDifficulty);
        //sets total number of exercises unlocked
        let total = calculateTotalUnlocked(unlockedExercisesByDifficulty);
        setTotalUnlocked(total);
      })
      .catch((error) => {
        console.log("private profile error", error);
        if (error === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const calculateTotalUnlocked = (athleteExercises) => {
    let total = 0;
    athleteExercises.forEach((number) => {
      total += number;
    });
    return total;
  };

  const calculateUnlockedExercises = (athleteExercises) => {
    let newUnlockedArray = [0, 0, 0, 0, 0];
    athleteExercises.forEach((exercise) => {
      //if exercise is unlocked
      if (exercise.locked === false) {
        newUnlockedArray[exercise.diff - 1] =
          newUnlockedArray[exercise.diff - 1] + 1;
      }
    });
    return newUnlockedArray;
  };

  const { name, typeOfAthlete, weight, personalRecords, sex } = values;

  const handleSkillUnlock = (skillID, unlockedSkill) => {
    let unlockedSkillsArray = updatedSkillArray(
      exerciseData,
      skillID,
      unlockedSkill
    );

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/unlock`,
      data: unlockedSkillsArray,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setExerciseData(res.data.skillsArray);
        toast.success("Skill unlocked!");
        let unlockedExercisesByDifficulty = calculateUnlockedExercises(
          res.data.skillsArray
        );
        setUnlockedExercises(unlockedExercisesByDifficulty);
        //sets total number of exercises unlocked
        let total = calculateTotalUnlocked(unlockedExercisesByDifficulty);
        setTotalUnlocked(total);
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.error);
      });
  };

  const filteredSkillArrayByAthlete = (exerciseArray, athleteType) => {
    let filteredArray = exerciseArray.filter((skill) => {
      return skill.category === athleteType;
    });
    return filteredArray;
  };

  //takes in current skill array and id of skill we want to unlock
  const updatedSkillArray = (currentArray, skillID, unlockedSkill) => {
    let removedSkillArray = currentArray.filter((skill) => {
      return skill.id !== skillID;
    });
    removedSkillArray.splice(unlockedSkill.id, 0, unlockedSkill);
    return removedSkillArray;
  };

  return (
    <Layout>
      <Container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Hello {name}
        </Typography>
      </Container>

      {exerciseData ? (
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={8} md={4}>
            <WidgetSummary totalUnlocked={totalUnlocked} />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <BarGraph unlockedExercises={unlockedExercises} />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <PieChart unlockedExercises={unlockedExercises} />
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}

      <Container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
          marginBottom: 12,
        }}
      >
        <Typography variant="h3" gutterBottom>
          CALISTHENICS
        </Typography>
        <Typography variant="h4" gutterBottom>
          "I'm the guy doing calisthenics. I'm doing jumping jacks and deep knee
          bends. I work out like a British person." - Ryan Reynolds
        </Typography>
      </Container>
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: {xs: "column", sm: "row"},
          alignItems: {xs: "center", sm: "normal"},
          mb: 10
        }}
      >
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
          }}
        >
          <TextField fullWidth label="Search" id="fullWidth" />
        </Box>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>A-Z</Button>
          <Button>Difficulty</Button>
          <Button>Locked</Button>
        </ButtonGroup>
      </Box>
      <ToastContainer />
      <div className="card-container">
        <Cali handleSkillUnlock={handleSkillUnlock} skills={exerciseData} />
      </div>
    </Layout>
  );
};

export default PrivateHome;
