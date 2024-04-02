import { createSlice } from "@reduxjs/toolkit";
import shopData from "../shopData";

const initialState = {
  cartProducts: [],
  products: shopData.map((product) => ({ ...product, quantityAdded: 0 })),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.cartProducts.find(
        (product) => product.id === newProduct.id
      );
      if (!existingProduct) {
        if (newProduct.quantity > 0) {
          state.cartProducts.push({ ...newProduct, quantityAdded: 1 });
        } else {
          alert(
            "Out of stock, please wait until new products are added. Thank you for your patience..."
          );
        }
      } else {
        const existingProductIndex = state.cartProducts.findIndex(
          (product) => product.id === newProduct.id
        );
        const currentQuantity =
          state.cartProducts[existingProductIndex].quantityAdded;

        if (currentQuantity < newProduct.quantity) {
          state.cartProducts[existingProductIndex].quantityAdded += 1;
        } else {
          alert(
            "Out of stock, please wait until new products are added. Thank you for your patience..."
          );
        }
      }
    },
    removeFromCart(state, action) {
      const productID = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== productID
      );
    },
    updateQuantity(state, action) {
      const { productID, newQuantity } = action.payload;
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === productID) {
          return {
            ...product,
            quantityAdded: newQuantity >= 0 ? newQuantity : 0,
          };
        }
        return product;
      });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
