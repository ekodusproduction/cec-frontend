import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    cart: cartSlice.reducer,
  },
});

export default store;
