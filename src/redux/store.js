import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
