import React from "react";
import useToggleCard from "../helpers/ToggleCard";
import planche from "../assets/images/exercises/planche.svg";
import fl from "../assets/images/exercises/front_lever.svg";
import pu from "../assets/images/exercises/pullup.svg";
import lock from "../assets/images/lock.svg";
import a_tuck_planche from "../assets/images/exercises/advanced_tuck_planche.svg";
import back_lever from "../assets/images/exercises/back_lever.svg";
import bench from "../assets/images/exercises/bench.svg";
import bw_squat from "../assets/images/exercises/bw_squat.svg";
import chinup from "../assets/images/exercises/chinup.svg";
import clap_pullup from "../assets/images/exercises/clap_pullup.svg";
import c_and_j from "../assets/images/exercises/clean_and_jerk.svg";
import deadlift from "../assets/images/exercises/deadlift.svg";
import dips from "../assets/images/exercises/dips.svg";
import frog_stand from "../assets/images/exercises/dips.svg";
import front_squat from "../assets/images/exercises/front_squat.svg";
import glute_bridge from "../assets/images/exercises/glute_bridge.svg";
import handstand from "../assets/images/exercises/glute_bridge.svg";
import hs_pushup from "../assets/images/exercises/hs_pushup.svg";
import human_flag from "../assets/images/exercises/human_flag.svg";
import iron_cross from "../assets/images/exercises/iron_cross.svg";
import l_sit from "../assets/images/exercises/l_sit.svg";
import maltese from "../assets/images/exercises/maltese.svg";
import manna from "../assets/images/exercises/muscle_up.svg";
import muscle_up from "../assets/images/exercises/muscle_up.svg";
import nordic_curls from "../assets/images/exercises/nordic_curls.svg";
import pike_pushups from "../assets/images/exercises/pike_pushups.svg";
import pistol_squats from "../assets/images/exercises/pistol_squat.svg";
import press_to_hs from "../assets/images/exercises/press_to_hs.svg";
import pullover from "../assets/images/exercises/pullover.svg";
import pushup from "../assets/images/exercises/pushup.svg";
import ring_pushup from "../assets/images/exercises/ring_pushup.svg";
import skin_the_cat from "../assets/images/exercises/skin_the_cat.svg";
import snatch from "../assets/images/exercises/snatch.svg";
import tuck_fl from "../assets/images/exercises/tuck_fl.svg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Unlock from "../helpers/Unlock";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const images = [
  planche,
  fl,
  pu,
  pullover,
  chinup,
  clap_pullup,
  iron_cross,
  frog_stand,
  a_tuck_planche,
  pushup,
  ring_pushup,
  maltese,
  dips,
  muscle_up,
  human_flag,
  bw_squat,
  pistol_squats,
  nordic_curls,
  glute_bridge,
  bench,
  front_squat,
  deadlift,
  snatch,
  c_and_j,
  handstand,
  hs_pushup,
  pike_pushups,
  press_to_hs,
  l_sit,
  manna,
  skin_the_cat,
  back_lever,
  tuck_fl,
];

const Cards = ({ skill, handleSkillUnlock }) => {
  const { id, exercise, locked, diff, desc, img, category } = skill;
  const [isOn, toggleIsOn] = useToggleCard(locked);
  const unlockSkill = {
    category: category,
    id: id,
    exercise: exercise,
    locked: false,
    diff: diff,
    desc: desc,
    img: img,
  };

  return (
    //center stuff in here
    <Container maxWidth="xl" sx={{marginBottom: 3, display: "flex", alignItems: "center", justifyContent: "center"}}>
        {isOn ? (
          <Card sx={{ maxWidth: 300 }}>
            <CardHeader
              sx={{ textAlign: "center" }}
              title={exercise.toUpperCase()}
              subheader={`Difficulty: ${diff}`}
            />
            <CardMedia component="img" height="300" image={lock} alt="Locked" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>
            <Box
              sx={{
                marginTop: 1,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Unlock
                handleSkillUnlock={handleSkillUnlock}
                id={id}
                unlockSkill={unlockSkill}
                toggleIsOn={toggleIsOn}
              />
            </Box>
          </Card>
        ) : (
          <Card sx={{ maxWidth: 300 }}>
            <CardHeader
              sx={{ textAlign: "center" }}
              title={exercise.toUpperCase()}
              subheader={`Difficulty: ${diff}`}
            ></CardHeader>
            <CardMedia
              component="img"
              height="300"
              image={images[id]}
              alt="Locked"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>
          </Card>
        )}
    </Container>
  );
};

export default Cards;
