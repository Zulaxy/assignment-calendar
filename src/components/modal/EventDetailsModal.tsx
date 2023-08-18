import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { CalendarEvent } from "../../types/types";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: any;
}

const EventDetailsModal = ({
  open,
  onClose,
  event,
}: EventDetailsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {event.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {event.type}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {event.description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
