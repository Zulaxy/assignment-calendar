// store/store.ts

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  clickedDate: null,
  modalData: null,
};

const mySlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    clickedDate: (state, action) => {
      state.clickedDate = action.payload;
    },
    updateModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

const store = configureStore({
  reducer: mySlice.reducer,
});

export const { updateData, clickedDate, updateModalData } = mySlice.actions;

export default store;
