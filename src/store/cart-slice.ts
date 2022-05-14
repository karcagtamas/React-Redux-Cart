import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: CartItemModel[];
  totalQuantity: number;
  changed: boolean;
}

export interface CartItemModel {
  itemId: string;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
}

export interface ItemModel {
  id: string;
  price: number;
  title: string;
  description: string;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false } as CartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const item = action.payload as ItemModel;
      const existingItem = state.items.find((i) => i.itemId === item.id);

      if (!existingItem) {
        state.items.push({
          itemId: item.id,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          name: item.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += item.price;
      }
      state.totalQuantity++;
      state.changed = true;
    },
    removeItemFromCart(state, action) {
      const id = action.payload as string;
      const existingItem = state.items.find((i) => i.itemId === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((i) => i.itemId === id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
