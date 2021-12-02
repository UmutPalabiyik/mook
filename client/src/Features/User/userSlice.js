import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../Services/Login.service";

export const userSubmit = createAsyncThunk("users/signup", async (params) => {
  try {
    const { submitFunc, submitForm, dispatch, closeModal, navigate } = params;
    const { data } = await submitFunc(submitForm);
    console.log(submitFunc, submitForm, dispatch, closeModal, navigate);
    dispatch(handleError(null));
    closeModal();
    navigate("/");

    return data;
  } catch (error) {
    const { dispatch } = params;
    const errorMessage = error.response.data.message;
    dispatch(handleError(errorMessage));
  }
});

export const userLogout = createAsyncThunk("users/logout", async (params) => {
  try {
    const { id, navigate, dispatch } = params;
    const { data } = await LoginService.logout(id);
    localStorage.removeItem("user");
    dispatch(clearUserData());
    navigate("/");

    return data;
  } catch (error) {
    return error.response.data;
  }
});

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
    clearUserData: (state) => {
      state.userData = {};
    },
  },
  extraReducers: {
    [userSubmit.pending]: (state, action) => {
      state.status = "loading";
    },
    [userSubmit.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "succeeded";
        state.userData = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    [userSubmit.error]: (state, action) => {
      state.status = "failed";
      state.errorResponse = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { handleError, clearUserData } = userSlice.actions;
export const errorResponse = (state) => state.user.errorResponse;
