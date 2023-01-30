import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  1688: [],
  taobao: [],
};

const populerSlice = createSlice({
  name: "populer",
  initialState,
  reducers: {
    setPopuler1688: (state, action) => {
      state["1688"] = action.payload;
    },
    setPopulerTaobao: (state, action) => {
      state.taobao = action.payload;
    },
    setWishlist: (state, action) => {
      if (action.payload.type == "1688") {
        state["1688"][action.payload.indexCategory].produk[
          action.payload.index
        ].wishlist =
          !state["1688"][action.payload.indexCategory].produk[
            action.payload.index
          ].wishlist;
      }
    },
  },
});

export const { setPopuler1688, setPopulerTaobao, setWishlist } =
  populerSlice.actions;

export const selectPopuler1688 = (state) => state.populer["1688"];
export const selectPopulerTaobao = (state) => state.populer.taobao;

export default populerSlice.reducer;
