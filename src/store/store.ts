// store/store.ts

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const counterSlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { updateData } = counterSlice.actions;

export default store;
