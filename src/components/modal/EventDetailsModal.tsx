//react imports
import React, { ChangeEvent, useState } from "react";

//material ui imports
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

//redux & types imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/types";
import { addEvent, deleteEvent, setModalOpen } from "../../store/store";
import { myAppColors } from "../../utils/appColors";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ open, onClose }: EventDetailsModalProps) => {
  const eventData = useSelector((state: RootState) => state.modalData);
  const modalType = useSelector((state: RootState) => state.modalOpen.type);
  const clickedDate = useSelector((state: RootState) => state.clickedDate);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    hour: "",
    description: "",
    type: "",
  });

  /**
   * Deletes a calendar event and closes the modal.
   *
   * @returns {void}
   */
  const handleDeleteEvent = () => {
    dispatch(deleteEvent({ event: eventData }));
    dispatch(setModalOpen(false));
  };

  /**
   * Handles changes in form input elements and updates the form data state.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent} e - The event object representing the change in the input or select element.
   * @returns {void}
   */
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the addition of a new event to the calendar.
   * It creates an event object from the form data, dispatches an action to add the event to the state,
   * and closes the modal.
   * @returns {void}
   */
  const handleAddNewEvent = () => {
    const event = {
      title: formData.title,
      hour: formData.hour,
      description: formData.description,
      type: formData.type,
    };

    const day = clickedDate;
    dispatch(addEvent({ day, event }));
    dispatch(setModalOpen(false));
  };

  <>
    <Stack
      direction="row"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <TextField
        id="standard-basic"
        variant="standard"
        value={modalType === "preview" ? eventData?.title : null}
      />

      <Close onClick={onClose} sx={{ cursor: "pointer" }} />
    </Stack>
    <Typography sx={{ fontSize: "0.65em" }}>Title</Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {eventData?.hour}
    </Typography>
    <Typography sx={{ fontSize: "0.65em" }}>Hour</Typography>

    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {eventData?.description}
    </Typography>
    <Typography sx={{ fontSize: "0.65em" }}>Description</Typography>

    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {eventData?.type &&
        eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1)}
    </Typography>
    <Typography sx={{ fontSize: "0.65em" }}>Type</Typography>
  </>;
  return (
    <Modal open={open} onClose={onClose} hideBackdrop>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 2px",
          p: 4,
        }}
      >
        {modalType === "preview" ? (
          <>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                sx={{ pb: 3, width: "50%" }}
                id="title"
                name="title"
                label="Title"
                variant="standard"
                value={eventData?.title}
                onChange={handleChange}
                fullWidth
              />

              <Close onClick={onClose} sx={{ cursor: "pointer" }} />
            </Stack>

            <TextField
              sx={{ pb: 3 }}
              id="hour"
              name="hour"
              label="Hour"
              variant="standard"
              value={eventData?.hour}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              sx={{ pb: 3 }}
              id="description"
              name="description"
              label="Description"
              variant="standard"
              rows={4}
              value={eventData?.description}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              sx={{ pb: 3 }}
              id="type"
              name="type"
              label="Type"
              variant="standard"
              value={
                eventData?.type &&
                eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1)
              }
              onChange={handleChange}
              fullWidth
            />

            <Button
              sx={{ backgroundColor: myAppColors.mainBlue }}
              variant="contained"
              onClick={handleDeleteEvent}
            >
              Delete this Event
            </Button>
          </>
        ) : (
          <>
            <Box>
              <form>
                <Stack
                  direction="row"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    sx={{ pb: 3, width: "50%" }}
                    id="title"
                    name="title"
                    label="Title"
                    variant="standard"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Close onClick={onClose} sx={{ cursor: "pointer" }} />
                </Stack>
                <TextField
                  sx={{ pb: 3 }}
                  id="hour"
                  name="hour"
                  label="Hour"
                  variant="standard"
                  value={formData.hour}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  sx={{ pb: 3 }}
                  id="description"
                  name="description"
                  variant="standard"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  fullWidth
                />
                <FormControl sx={{ width: "100%", pb: 3 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    id="type"
                    name="type"
                    variant="standard"
                    value={formData.type}
                    defaultValue=""
                    onChange={handleChange}
                  >
                    <MenuItem value="meeting">Meeting</MenuItem>
                    <MenuItem value="reminder">Reminder</MenuItem>
                  </Select>
                </FormControl>
              </form>
              <Button
                sx={{ backgroundColor: myAppColors.mainBlue }}
                variant="contained"
                onClick={handleAddNewEvent}
              >
                Save The Event
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
