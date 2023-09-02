import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCart: false,
    showSidebar: false,
  },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
