import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempProductList: [],
  tempAnotherProductList: [],
  lastPage: null,
  lastKeyword: null,
  lastProductIdClicked: null,
};

const temporaryProductListSlice = createSlice({
  name: "temporaryProductList",
  initialState,
  reducers: {
    setTemporaryProductList: (state, action) => {
      state.tempProductList = action.payload;
    },
    setTemporaryAnotherProductList: (state, action) => {
      state.tempAnotherProductList = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setLastKeyword: (state, action) => {
      state.lastKeyword = action.payload;
    },
    setLastProductIdClicked: (state, action) => {
      state.lastProductIdClicked = action.payload;
    },
    resetTemporaryState: (state) => {
        state.tempProductList = [];
        state.tempAnotherProductList = [];
        state.lastPage = null;
        state.lastKeyword = null;
        state.lastProductIdClicked = null;
    }
  },
});

export const { setTemporaryProductList, setTemporaryAnotherProductList, setLastPage, setLastKeyword, setLastProductIdClicked, resetTemporaryState } = temporaryProductListSlice.actions;

export const selectTemporaryProductList = (state) => state.temporaryProductList.tempProductList;

export default temporaryProductListSlice.reducer;
