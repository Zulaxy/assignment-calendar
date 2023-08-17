import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import augustDaysData from "./mockdata/mockData.json";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "./store/store";

import SingleDay from "./components/SingleDay";

function App() {
  const data = useSelector((state: any) => state.data);

  const dispatch = useDispatch();

  //stores the data in redux upon initial render of the component
  useEffect(() => {
    dispatch(updateData(augustDaysData));
  }, []);

  return (
    <>
      <Typography>This is my react app</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {augustDaysData.map((dayData: any) => (
          <SingleDay singleDay={dayData} />
        ))}
      </Box>
    </>
  );
}

export default App;
