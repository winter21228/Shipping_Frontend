import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../../utils/axios";

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  user,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// ----------------------------------------------------------------------

export const { startLoading, hasError } = slice.actions;

// ----------------------------------------------------------------------
export const register = createAsyncThunk(
  "user/register",
  async (data, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("/api/auth/register", data);
      if (response.status === 201) {
        const { accessToken, user } = response.data.msg;
        setSession(accessToken);
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const googleLogin = createAsyncThunk("user/googleLogin", async () => {
  axios.get("/auth/google");
});

// ----------------------------------------------------------------------
export const login = createAsyncThunk(
  "user/login",
  async (data, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        const { accessToken, user } = response.data.msg;
        setSession(accessToken);
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    setSession(null);
    dispatch(logoutSuccess());
  }
);
