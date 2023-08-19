import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import augustDaysData from "./mockdata/mockData.json";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, updateData } from "./store/store";
import { RootState, SingleDayTypes } from "./types/types";
import { daysOfTheWeek } from "./mockdata/daysOfWeek";
import { v4 as uuidv4 } from "uuid";

import SingleDay from "./components/SingleDay";
import EventDetailsModal from "./components/modal/EventDetailsModal";
import { myAppColors } from "./utils/appColors";

function App() {
  const data = useSelector((state: RootState) => state.data);
  const { modalOpen } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setModalOpen(false));
  };

  /**
   * Groups an array of day data into weeks, each containing 7 days.
   *
   * @param {Array} daysData - An array of day data objects.
   * @returns {Array} An array of arrays, each representing a week of days.
   */
  const groupDaysByWeek = (daysData: SingleDayTypes[]) => {
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

  useEffect(() => {
    const updatedData = augustDaysData.map((item) => {
      if (Array.isArray(item.events)) {
        const updatedEvents = item.events.map((event) => ({
          ...event,
          id: uuidv4(),
        }));
        return { ...item, events: updatedEvents };
      }
      return item;
    });

    dispatch(updateData(updatedData));
  }, []);

  console.log(data);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <Box sx={{ display: "flex" }}>
          {daysOfTheWeek.map((day) => (
            <Typography
              key={day}
              sx={{
                width: "calc(100% / 7)",
                textAlign: "center",

                color: myAppColors.mainGray,
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
              <SingleDay key={dayData.day} singleDay={dayData} />
            ))}
          </Box>
        ))}

        {modalOpen.state && (
          <Box>
            <EventDetailsModal
              open={modalOpen.state}
              onClose={handleModalClose}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
