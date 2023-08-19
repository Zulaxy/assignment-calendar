//react imports
import React from "react";

//material ui
import { Button, Stack, Typography } from "@mui/material";
import { Event, Notifications } from "@mui/icons-material";

//types & utils
import { CalendarEvent } from "../types/types";
import { myAppColors } from "../utils/appColors";

interface EventField {
  event: CalendarEvent;
}

const EventField = ({ event }: EventField) => {
  return (
    <Button
      sx={{
        width: "auto",
        height: "25px",
        mx: "1px",
        mb: "2px",
        backgroundColor:
          event.type === "meeting"
            ? myAppColors.mainPurple
            : event.type === "reminder"
            ? myAppColors.mainBlue
            : null,
        "&:hover": {
          backgroundColor:
            event.type === "meeting"
              ? myAppColors.hoverPurple
              : event.type === "reminder"
              ? myAppColors.hoverBlue
              : null,
        },
      }}
      variant="contained"
    >
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Stack direction="row">
          {event.type === "meeting" && <Event sx={{ fontSize: "1.2em" }} />}
          {event.type === "reminder" && (
            <Notifications sx={{ fontSize: "1.2em" }} />
          )}
          <Typography sx={{ fontSize: "0.65rem", pl: 1 }}>
            {event.title}
          </Typography>
        </Stack>

        <Typography sx={{ fontSize: "0.65rem" }}>{event.hour}</Typography>
      </Stack>
    </Button>
  );
};

export default EventField;
