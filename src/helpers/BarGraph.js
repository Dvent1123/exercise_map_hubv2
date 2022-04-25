import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

// @mui

// ----------------------------------------------------------------------
// SECONDARY LIGHT: #ffffff
// SECONDARY DARK: #9fb7c9
// color: "#1976d2"
// bgcolor: "#d1e9fc"

// ----------------------------------------------------------------------

export default function BarGraph({ unlockedExercises }) {
  const [unlocked, setUnlocked] = useState([0, 0, 0, 0, 0]);

  //gotta figure out how to handle change here
  const handlechange = (unlockedExercises) => {
    setUnlocked(unlockedExercises);
  };

  const series = [
    {
      name: "Unlocked",
      data: unlocked,
    },
  ];

  const chartOptions = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        labels: {
          show: true,
          rotate: -45,
        },
        title: {
          text: "Difficulty",
        },
        categories: [1, 2, 3, 4, 5],
      },
    },
    yaxis: {
      labels: {
        show: true,
        rotate: -45,
      },
      title: {
        text: "Unlocked",
      },
    },
  };

  useEffect(() => {
    handlechange(unlockedExercises);
  }, [unlocked, unlockedExercises]);

  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: "center",
        color: "#9ebfcc",
        bgcolor: "#d0f2ff",
        borderRadius: 5,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardHeader title={"Exercises Unlocked"} subheader={"By Difficulty"} />
      {unlocked ? (
        <Chart
          options={chartOptions.options}
          series={series}
          type="bar"
          width={315}
          height={250}
        />
      ) : (
        <div></div>
      )}
    </Card>
  );
}
