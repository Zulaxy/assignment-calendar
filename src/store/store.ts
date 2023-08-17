// store/store.ts

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  clickedDate: null,
};

const counterSlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    clickedDate: (state, action) => {
      state.clickedDate = action.payload;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { updateData, clickedDate } = counterSlice.actions;

export default store;
