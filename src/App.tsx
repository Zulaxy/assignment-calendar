import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import augustDaysData from "./mockdata/mockData.json";
import { useSelector, useDispatch } from "react-redux";
import { updateData, clickedDate } from "./store/store";

import { daysOfTheWeek } from "./mockdata/daysOfWeek";

import SingleDay from "./components/SingleDay";

function App() {
  const data = useSelector((state: any) => state.data);

  const dispatch = useDispatch();

  /**
   * Groups an array of day data into weeks, each containing 7 days.
   *
   * @param {Array} daysData - An array of day data objects.
   * @returns {Array} An array of arrays, each representing a week of days.
   */
  const groupDaysByWeek = (daysData: any[]) => {
    const weeks = [];
    let currentWeek = [];

    for (const dayData of daysData) {
      currentWeek.push(dayData);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = groupDaysByWeek(data);

  const handleUpdateClickedDate = (date: string) => {
    dispatch(clickedDate(date));
  };

  //stores the data in redux upon initial render of the component
  useEffect(() => {
    dispatch(updateData(augustDaysData));
  }, []);

  return (
    <>
      <Typography>This is my react app</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          {daysOfTheWeek.map((day) => (
            <Typography
              key={day}
              sx={{
                width: "calc(100% / 7)",
                textAlign: "center",
                color: "red",
                marginRight: "-1px",
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>
        {weeks.map((week, weekIndex) => (
          <Box key={weekIndex} sx={{ display: "flex" }}>
            {week.map((dayData) => (
              <SingleDay
                key={dayData.day}
                singleDay={dayData}
                onHandleUpdateClickedDate={handleUpdateClickedDate}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default App;
