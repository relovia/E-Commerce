import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadState() || {
  currentUserUID: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserUID = action.payload;
      localStorage.setItem("userState", JSON.stringify(state));
    },
    signOut: (state) => {
      state.currentUserUID = null;
      localStorage.removeItem("userState");
    },
  },
});

export const { setCurrentUser, signOut } = userSlice.actions;

export const watchAuthState = () => (dispatch) => {
  const unsubscribe = onAuthStateChangedListener((user) => {
    if (user) {
      const serializedUser = {
        uid: user.uid,
        email: user.email,
      };
      dispatch(setCurrentUser(serializedUser));
    } else {
      dispatch(signOut);
    }
  });
  return unsubscribe;
};

export default userSlice.reducer;
