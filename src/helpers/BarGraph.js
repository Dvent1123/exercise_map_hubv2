import React, { useState } from "react";
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

export default function BarGraph() {
  const [chartOptions, setChartOptions] = useState({
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
    series: [
      {
        name: "Unlocked",
        data: [10, 7, 4, 6, 2],
      },
    ],
  });

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
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width={315}
        height={250}
      />
    </Card>
  );
}
