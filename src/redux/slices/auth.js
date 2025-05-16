import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { setSession } from "../../utils/session";

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const slice = createSlice({
  name: "auth",
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

    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    initializeSuccess(state, action) {
      state.isLoading = false;
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    setUser(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    logoutSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Reducer
export default slice.reducer;

export const {
  loginSuccess,
  startLoading,
  hasError,
  initializeSuccess,
  logoutSuccess,
  setUser,
} = slice.actions;

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

export const getMe = createAsyncThunk(
  "user/get_me",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/api/auth/my-account");
      if (response.status === 200) {
        const user = response.data.msg;
        dispatch(setUser(user));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);
