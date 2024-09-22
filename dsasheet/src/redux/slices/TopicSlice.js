import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listTopicFetch } from "../../services/Topics";

export const topicsList = createAsyncThunk(
  "topic/listTopics",
  async (thunkAPI) => {
    const response = await listTopicFetch();
    if (response) {
      return response; // Assuming the API returns the user data on success
    } else {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topicsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(topicsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(topicsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;
