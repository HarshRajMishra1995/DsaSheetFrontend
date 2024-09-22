import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginFetch,
  signUpFetch,
  userProgressFetch,
} from "../../services/Auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    console.log("Credentials ---> ", credentials);
    const response = await loginFetch(credentials);
    if (response) {
      return response; // Assuming the API returns the user data on success
    } else {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (credentials, thunkAPI) => {
    const response = await signUpFetch(credentials);
    if (response) {
      return response; // Assuming the API returns the user data on success
    } else {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);
export const getUserProgress = createAsyncThunk(
  "auth/getUserProgress",
  async (userId, thunkAPI) => {
    const response = await userProgressFetch(userId);
    if (response) {
      return response; // Assuming the API returns the user data on success
    } else {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    userProgressDetails: [],
    topicCompletedDetails: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserProgress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProgressDetails = action.payload;
        state.topicCompletedDetails = action.payload;
      })
      .addCase(getUserProgress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
