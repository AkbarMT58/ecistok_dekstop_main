import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "1688",
};

const searchSlice = createSlice({
  name: "searchType",
  initialState,
  reducers: {
    changeSearchType: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { changeSearchType } = searchSlice.actions;

export const selectType = (state) => state.searchType.data;

export default searchSlice.reducer;
