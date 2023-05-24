import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  isLoading: false,
  posts: [],
};

// funzione che fa fetch dei post
// rejectWithValue e' una funzione che gestisce l'errore in caso di rigetto e te lo mostra
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5050/posts");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "errore durante il caricamento dei post";
      });
  },
});

export const postResponse = (state) => state.postsState.response;
export const postLoading = (state) => state.postsState.isLoading;
export const postsArray = (state) => state.postsState.posts;
export default postsSlice.reducer;
