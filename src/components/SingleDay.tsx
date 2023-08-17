import { Box, Typography } from "@mui/material";
import React from "react";

interface SingleDayProps {
  singleDay: any;
}

const SingleDay = ({ singleDay }: SingleDayProps) => {
  console.log(singleDay);
  return (
    <Box
      sx={{ border: `1px solid black`, width: "300px", height: "200px", m: 1 }}
    >
      <Typography>{singleDay.dayOfWeek}</Typography>
      <Typography>{singleDay.day}</Typography>
      {singleDay.events &&
        singleDay.events.map((event: any, index: number) => (
          <div key={index}>
            <Typography>{event.title}</Typography>
            <Typography>{event.hour}</Typography>
          </div>
        ))}
    </Box>
  );
};

export default SingleDay;
