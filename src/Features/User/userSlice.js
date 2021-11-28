import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../Services/Login.service";

export const userRegister = createAsyncThunk(
  "users/register",
  async (params) => {
    try {
      const { registerForm, dispatch, navigate } = params;
      const { data } = await LoginService.register(registerForm);
      dispatch(handleError(null));

      return data;
    } catch (error) {
      const { dispatch } = params;
      dispatch(handleError(error.response.data.message));
    }
  }
);

const initialState = {
  userData: {},
  errorResponse: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "User",
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
