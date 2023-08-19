//react Imports
import React from "react";

//material ui imports
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

//types & utils imports
import { CalendarEvent, RootState, SingleDayTypes } from "../types/types";
import { myAppColors } from "../utils/appColors";

//project imports
import EventField from "./EventField";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  updateModalData,
  setModalOpen,
  updateClickedDate,
} from "../store/store";

interface SingleDayProps {
  singleDay: SingleDayTypes;
}

const SingleDay = ({ singleDay }: SingleDayProps) => {
  const { clickedDate } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  /**
   * Opens a modal for previewing a calendar event and dispatches data to populate it.
   *
   * @param {CalendarEvent} event - The calendar event to preview.
   * @returns {void}
   */
  const handleModalPreviewOpen = (event: CalendarEvent) => {
    dispatch(
      updateModalData({
        title: event.title,
        hour: event.hour,
        type: event.type,
        description: event.description,
        id: event.id,
        day: singleDay.day,
      })
    );
    dispatch(setModalOpen({ state: true, type: "preview" }));
  };

  /**
   * Opens a new calendar event modal.
   *
   * @returns {void}
   */
  const handleModalNewOpen = () => {
    dispatch(setModalOpen({ state: true, type: "add" }));
  };

  /**
   * Updates the clicked date in the calendar.
   *
   * @param {string} date - The date to set as the clicked date.
   * @returns {void}
   */
  const handleUpdateClickedDate = (date: string) => {
    dispatch(updateClickedDate(date));
  };

  return (
    <Box
      onClick={() => {
        handleUpdateClickedDate(singleDay.day!);
      }}
      sx={{
        border: `1px solid ${myAppColors.contarstGray}`,
        width: "calc(100% / 7)",
        height: "200px",
        boxSizing: "border-box",
        flexShrink: 0,
        marginBottom: "-1px",
        marginRight: "-1px",
        transition: "border-color 0.2s",
        position: "relative",
        ...(clickedDate === singleDay.day && {
          "&::before": {
            content: "''",
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            border: `2px solid ${myAppColors.mainBlue}`,
          },
        }),
        "&:hover::before": {
          content: "''",
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          border: `2px solid ${myAppColors.hoverBlue}`,
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar
          sx={{
            fontSize: "0.80em",
            width: 24,
            height: 24,
            my: 2,
            backgroundColor:
              clickedDate === singleDay.day ? myAppColors.mainGreen : null,
            cursor: "pointer",
          }}
        >
          {singleDay.day}
        </Avatar>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          {Array.isArray(singleDay.events) ? (
            <Box>
              {singleDay.events.map((event: CalendarEvent, index: number) => (
                <Box
                  onClick={() => {
                    handleModalPreviewOpen(event);
                  }}
                  key={index}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <EventField event={event} />
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>

        {clickedDate === singleDay.day && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-end",
              position: "absolute",
              bottom: 0,
              right: 0,
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            <IconButton
              onClick={handleModalNewOpen}
              aria-label="add"
              color={"primary"}
            >
              <Add />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleDay;
