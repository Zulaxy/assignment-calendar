//react imports
import { useEffect, useState } from "react";

//date picker component imports
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimePickerProps {
  selectedTime: string;
  onTimeChange: (newTime: string) => void;
}

const TimePickerValue = ({ selectedTime, onTimeChange }: TimePickerProps) => {
  const [internalValue, setInternalValue] = useState(selectedTime);

  useEffect(() => {
    setInternalValue(selectedTime);
  }, [selectedTime]);

  /**
   * Handles changes in the selected time from a TimePicker component.
   *
   * @param {any} newValue - The new selected time, which can be a Date object or null.
   * @returns {void}
   */
  const handleTimeChange = (newValue: any) => {
    // Extract the hour and minute as "HH:mm" format from the selected time.
    const selectedHour = newValue ? newValue.format("HH:mm") : "";
    setInternalValue(newValue);
    onTimeChange(selectedHour);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <TimePicker
          label="Pick an hour"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickerValue;
