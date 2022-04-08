import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import axios from "axios";
import { isAuth, getCookie, signout } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Cali from "../helpers/Cali";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const PrivateHome = ({ history }) => {
  const [exerciseData, setExerciseData] = useState(null);

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
        <Container spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mt: 4}}>
          <Typography variant="h4" gutterBottom>
            Hello {name}
          </Typography>
        </Container>
      <ToastContainer />
      <div className="card-container">
        <Cali handleSkillUnlock={handleSkillUnlock} skills={exerciseData} />
      </div>
    </Layout>
  );
};

export default PrivateHome;
