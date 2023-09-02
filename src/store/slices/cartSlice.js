import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    qualification: "",
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          price: newItem.price,
          registrationFees: newItem.registrationFees,
          quantity: 1,
          id: newItem.id,
          courseId: newItem.courseId,
        });
        state.totalQuantity++;
        state.totalPrice += newItem.registrationFees;
      } else {
        return;
      }
    },
    removeItemFromCart(state, action) {
      const removeId = action.payload;
      const existingItem = state.items.find((item) => item.id === removeId);
      state.totalQuantity--;
      state.totalPrice -= existingItem.registrationFees;
      existingItem.addedToCart = false; // Set addedToCart to false
      state.items = state.items.filter((item) => item.id !== removeId);
    },
    emptyCart(state) {
      (state.items = []), (state.totalPrice = 0), (state.totalQuantity = 0);
    },
    setQualification(state, action) {
      state.qualification = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
