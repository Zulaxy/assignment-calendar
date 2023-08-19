import { Box, Modal, Stack, Typography } from "@mui/material";
import React from "react";

import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../types/types";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ open, onClose }: EventDetailsModalProps) => {
  const eventData = useSelector((state: RootState) => state.modalData);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            onClick={onClose}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {eventData?.title}
          </Typography>
          <Close onClick={onClose} sx={{ cursor: "pointer" }} />
        </Stack>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {eventData?.hour}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {eventData?.description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
