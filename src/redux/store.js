import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    user: userReducer,
  },
});
