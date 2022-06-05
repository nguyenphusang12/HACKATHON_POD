import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import { addProduct, deleteProduct ,setTitlePage} from "./productSlice";

export default configureStore({
  reducer: {
    product: productsReducer,
  },
});
export { addProduct, deleteProduct ,setTitlePage};
