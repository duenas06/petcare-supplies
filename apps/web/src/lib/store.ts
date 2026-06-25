import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import catalogReducer from "@/features/catalog/catalogSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      catalog: catalogReducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
