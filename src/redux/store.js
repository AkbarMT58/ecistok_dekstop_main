import { configureStore } from "@reduxjs/toolkit";
import searchTypeReducers from "./reducers/searchSlice";
import productPopulerReducers from "./reducers/populerSlice";
import temporaryProductListReducers from "./reducers/temporaryProductListSlice";

export default configureStore({
  reducer: {
    searchType: searchTypeReducers,
    populer: productPopulerReducers,
    temporaryProductList: temporaryProductListReducers,
  },
});
