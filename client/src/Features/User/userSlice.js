import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../../Services/Login.service";

export const userSubmit = createAsyncThunk("user/signup", async (params) => {
  try {
    const { submitFunc, submitForm, dispatch, closeModal, navigate } = params;
    const { data } = await submitFunc(submitForm);
    dispatch(handleError(null)); // clear error message after
    closeModal();
    navigate("/");

    return data;
  } catch (error) {
    const { dispatch } = params;
    const errorMessage = error.response.data.message;
    dispatch(handleError(errorMessage));
  }
});

export const userLogout = createAsyncThunk("user/logout", async (params) => {
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

export const userRefreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (params) => {
    try {
      const { id } = params;
      const { data } = await LoginService.refreshAccessToken(id);
      return data;
    } catch (error) {
      return error.response.data;
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
    [userRefreshAccessToken.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "succeeded";
        const data = { ...state.userData, accessToken: action.payload };
        state.userData = data;
        localStorage.setItem("user", JSON.stringify(data));
      }
    },
  },
});

export default userSlice.reducer;
export const { handleError, clearUserData } = userSlice.actions;
export const errorResponse = (state) => state.user.errorResponse;
