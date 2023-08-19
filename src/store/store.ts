// store/store.ts

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { CalendarEvent, SingleDayTypes } from "../types/types";

const initialState = {
  data: [],
  clickedDate: null,
  modalData: null,
  modalOpen: { state: false, type: null },
};

const mySlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateClickedDate: (state, action) => {
      state.clickedDate = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    updateModalData: (state, action) => {
      state.modalData = action.payload;
    },
    addEvent: (state, action) => {
      const { day, event } = action.payload;
      const foundDay = state.data.find(
        (item: SingleDayTypes) => item.day === day
      ) as SingleDayTypes | undefined;

      if (foundDay) {
        if (!foundDay!.events) {
          foundDay!.events = [];
        }
        (foundDay!.events as CalendarEvent[]).push(event);
      }
    },
  },
});

const store = configureStore({
  reducer: mySlice.reducer,
});

export const {
  updateData,
  updateClickedDate,
  updateModalData,
  setModalOpen,
  addEvent,
} = mySlice.actions;

export default store;
