import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productSelect: null,
    titlePage: "",
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
    setTitlePage: (state,actions) =>{
      state.titlePage = actions.payload;
    }
  },
});

export const { addProduct, deleteProduct ,setTitlePage} = productSlice.actions;

export default productSlice.reducer;
