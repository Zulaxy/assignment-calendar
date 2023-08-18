import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";

import { CalendarEvent, SingleDayTypes } from "../types/types";
import { useSelector } from "react-redux";

import { myAppColors } from "../utils/appColors";

import EventField from "./EventField";
import EventDetailsModal from "./modal/EventDetailsModal";

interface SingleDayProps {
  singleDay: SingleDayTypes;
  onHandleUpdateClickedDate: (date: string) => void;
}

const SingleDay = ({
  singleDay,
  onHandleUpdateClickedDate,
}: SingleDayProps) => {
  const clickedDate = useSelector((state: any) => state.clickedDate);

  return (
    <Box
      sx={{
        border: `1px solid black`,
        width: "calc(100% / 7)",
        height: "200px",
        boxSizing: "border-box",
        flexShrink: 0,
        marginBottom: "-1px",
        marginRight: "-1px",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar
          onClick={() => {
            onHandleUpdateClickedDate(singleDay.day);
          }}
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
      {Array.isArray(singleDay.events) ? (
        <Box>
          {singleDay.events.map((event: CalendarEvent, index: number) => (
            <Box key={index} sx={{ display: "flex" }}>
              <EventField event={event} />
            </Box>
          ))}
        </Box>
      ) : (
        singleDay.events && (
          <Box>
            <EventField event={singleDay.events} />
          </Box>
        )
      )}
    </Box>
  );
};

export default SingleDay;
