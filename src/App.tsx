import React from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import augustDaysData from "./mockData.json";

import SingleDay from "./components/SingleDay";

function App() {
  return (
    <>
      <Typography>This is my react app</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {augustDaysData.map((dayData) => (
          <SingleDay singleDay={dayData} />
        ))}
      </Box>
    </>
  );
}

export default App;
