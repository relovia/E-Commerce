import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setFormField: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => {
      return { ...initialState };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFormField, resetForm, setError } = signUpSlice.actions;

export default signUpSlice.reducer;
