import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { CalendarEvent } from "../types/types";

import { myAppColors } from "../utils/appColors";

import { Event, Notifications } from "@mui/icons-material";
import EventDetailsModal from "./modal/EventDetailsModal";
interface EventField {
  event: CalendarEvent;
}

const EventField = ({ event }: EventField) => {
  const [modal, setModal] = useState(false);
  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <Button
      onClick={handleModalOpen}
      sx={{
        width: "100%",
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
      {modal && (
        <EventDetailsModal
          open={modal}
          onClose={handleModalClose}
          event={event}
        />
      )}
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
