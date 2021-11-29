import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../Services/Login.service";

export const userRegister = createAsyncThunk(
  "users/register",
  async (params) => {
    try {
      const { registerForm, dispatch, closeModal } = params;
      const { data } = await LoginService.register(registerForm);
      dispatch(handleError(null));
      closeModal();

      return data;
    } catch (error) {
      const { dispatch } = params;
      const errorMessage = error.response.data.message;
      dispatch(handleError(errorMessage));
    }
  }
);

const initialState = {
  userData: {},
  errorResponse: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleError: (state, action) => {
      state.errorResponse = action.payload;
    },
  },
  extraReducers: {
    [userRegister.pending]: (state, action) => {
      state.status = "loading";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [userRegister.error]: (state, action) => {
      state.status = "failed";
      state.errorResponse = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { handleError } = userSlice.actions;
export const errorResponse = state => state.user.errorResponse;

