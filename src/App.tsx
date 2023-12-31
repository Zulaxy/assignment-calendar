//react imports
import React, { useEffect } from "react";

//project imports
import SingleDay from "./components/SingleDay";
import EventDetailsModal from "./components/modal/EventDetailsModal";

//material ui imports
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

//utils & data
import { v4 as uuidv4 } from "uuid";
import { daysOfTheWeek } from "./utils/appConstants";
import { myAppColors } from "./utils/appConstants";
import augustDaysData from "./mockdata/mockData.json";

//redux & types imports
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, updateData } from "./store/store";
import { RootState, SingleDayTypes } from "./types/types";

function App() {
  const data = useSelector((state: RootState) => state.data);
  const modalOpen = useSelector((state: RootState) => state.modalOpen);
  const clickedDate = useSelector((state: RootState) => state.clickedDate);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();

  /**
   * Opens a new calendar event modal.
   *
   * @returns {void}
   */
  const handleModalNewOpen = () => {
    dispatch(setModalOpen({ state: true, type: "add" }));
  };

  /**
   * Closes the modal by dispatching an action to set the modal open state to false.
   *
   * @returns {void}
   */
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

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <Box sx={{ display: "flex" }}>
          {daysOfTheWeek.map((day) => (
            <Typography
              key={day}
              sx={{
                width: "calc(100% / 7)",
                fontSize: {
                  xs: "0.75em",
                  sm: "0.85em",
                  md: "1em",
                  lg: "1.25em",
                },
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

        {isSmallScreen && (
          <Box
            sx={{
              disply: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              disabled={clickedDate === null}
              size="small"
              sx={{
                backgroundColor: myAppColors.mainBlue,
                mt: 2,
              }}
              variant="contained"
              onClick={handleModalNewOpen}
            >
              Add event for the selected Date
            </Button>
          </Box>
        )}

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
