import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductCategory } from "@jibs/shared";

type CatalogState = {
  activeCategory: ProductCategory | "all";
  query: string;
};

const initialState: CatalogState = {
  activeCategory: "all",
  query: ""
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CatalogState["activeCategory"]>) {
      state.activeCategory = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    }
  }
});

export const { setCategory, setQuery } = catalogSlice.actions;
export default catalogSlice.reducer;
