import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  // name of the slice
  // this is the name of the slice in the store
  name: "modal",
  // initial state of the slice
  initialState,
  // reducers are synchronous
  // extraReducers are asynchronous
  // extraReducers are called when the async thunk is dispatched
  // reducers are called when the action is dispatched
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
