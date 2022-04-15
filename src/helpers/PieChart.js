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

export default function PieChart() {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: "center",
        color: "#1976d2",
        bgcolor: "#d1e9fc",
        borderRadius: 5,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CardHeader title={"Fake Title"} subheader={"Fake Subheader"} />
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width={300}
        height={300}
      />
    </Card>
  );
}
