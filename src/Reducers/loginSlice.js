import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  isLoading: false,
};

export const loginRequest = createAsyncThunk(
  "login/userLogin",
  async (data) => {
    try {
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      if (error) throw new Error("Errore durante la ricezione dei dati");
    }
  }
);

const loginSlice = createSlice({
  name: "Login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        // modifichiamo gli stati
        state.isLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        // dobbiamo dirgli cosa deve fare quando la promise e' stata risolta
        state.isLoading = false
        state.response = action.payload.message;

        if (action.payload.statusCode === 200) {
          localStorage.setItem("loggedIn", JSON.stringify(action.payload));
        }
      })
      .addCase(loginRequest.rejected, (state) => {
        state.isLoading = false
        state.error = "Errore durante il login";
      });
  },
});

export const loginResponse = (state) => state.loginState.response;
export const loginLoading = (state) => state.loginState.isLoading;
export default loginSlice.reducer;
