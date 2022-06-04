import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productSelect: null,
    products: [
      {
        name: "Vay",
      },
    ],
  },
  reducers: {
    addProduct: (state, actions) => {
      state.products.push(actions.payload);
    },
    deleteProduct: (state) => {
      state.products.splice(state.products.length - 1, 1);
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
