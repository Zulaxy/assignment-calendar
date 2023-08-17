import { Box, Typography } from "@mui/material";
import React from "react";

interface SingleDayProps {
  singleDay: any;
}

const SingleDay = ({ singleDay }: SingleDayProps) => {
  return (
    <Box
      sx={{ border: `1px solid black`, width: "300px", height: "200px", m: 1 }}
    >
      <Typography>{singleDay.dayOfWeek}</Typography>
      <Typography>{singleDay.day}</Typography>
      {Array.isArray(singleDay.events) ? (
        <Box>
          {singleDay.events.map((event: any, index: number) => (
            <Box key={index}>
              <Typography>{event.title}</Typography>
              <Typography>{event.hour}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        singleDay.events && (
          <Box>
            <Typography>{singleDay.events.title}</Typography>
            <Typography>{singleDay.events.hour}</Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default SingleDay;
