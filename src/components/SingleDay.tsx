import { Box, Typography } from "@mui/material";
import React from "react";

import { CalendarEvent, SingleDay as SingleDayTypes } from "../types";
import { useSelector } from "react-redux";

interface SingleDayProps {
  singleDay: SingleDayTypes;
  onHandleUpdateClickedDate: (date: string) => void;
}

const SingleDay = ({
  singleDay,
  onHandleUpdateClickedDate,
}: SingleDayProps) => {
  const clickedDate = useSelector((state: any) => state.clickedDate);
  console.log(clickedDate);

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
        <Typography
          sx={{
            mt: 2,
            color: clickedDate === singleDay.day ? "green" : null,
            cursor: "pointer",
          }}
          onClick={() => {
            onHandleUpdateClickedDate(singleDay.day);
          }}
        >
          {singleDay.day}
        </Typography>
      </Box>
      {Array.isArray(singleDay.events) ? (
        <Box>
          {singleDay.events.map((event: CalendarEvent, index: number) => (
            <Box key={index} sx={{ display: "flex" }}>
              <Typography>{event.title}</Typography>
              <Typography>{event.hour}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        singleDay.events && (
          <Box>
            <Typography>{(singleDay.events as CalendarEvent).title}</Typography>
            <Typography>{(singleDay.events as CalendarEvent).hour}</Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default SingleDay;
