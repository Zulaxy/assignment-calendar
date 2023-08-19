//react imports
import React from "react";

//material ui
import { Button, Stack, Typography } from "@mui/material";
import { Event, NoEncryption, Notifications } from "@mui/icons-material";

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
        minWidth: "0px",
        width: "auto",
        height: "auto",
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Stack direction="row" alignItems="center">
          {event.type === "meeting" && (
            <Event sx={{ fontSize: { xs: "0.75em", sm: "1.2em" } }} />
          )}
          {event.type === "reminder" && (
            <Notifications sx={{ fontSize: { xs: "0.75em", sm: "1.2em" } }} />
          )}
          <Typography
            sx={{
              fontSize: "0.65rem",
              pl: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            {event.title}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: "0.65rem",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          {event.hour}
        </Typography>
      </Stack>
    </Button>
  );
};

export default EventField;
