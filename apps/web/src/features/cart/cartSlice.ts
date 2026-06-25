import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartLine, Product } from "@jibs/shared";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
};

const initialState: CartState = {
  lines: [],
  isOpen: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.lines.find((line) => line.productId === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.lines.push({
          productId: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1
        });
      }

      state.isOpen = true;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const existing = state.lines.find((line) => line.productId === action.payload);

      if (!existing) {
        return;
      }

      existing.quantity -= 1;
      state.lines = state.lines.filter((line) => line.quantity > 0);
    },
    removeLine(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((line) => line.productId !== action.payload);
    },
    clearCart(state) {
      state.lines = [];
    },
    toggleCart(state, action: PayloadAction<boolean | undefined>) {
      state.isOpen = action.payload ?? !state.isOpen;
    }
  }
});

export const { addToCart, clearCart, decreaseQuantity, removeLine, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
