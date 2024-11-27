import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "@/redux/thunks/authActions";

const initialState = {
  user: null,
  isAuthenticated: Cookies.get("_user_accessToken_") ? true : false,
  token: Cookies.get("_user_accessToken_"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==================================== || REGISTER || ====================================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        Cookies.set("_user_accessToken_", action.payload.token, {
          expires: 7,
        });
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   ==================================== || LOGIN || ====================================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        Cookies.set("_user_accessToken_", action.payload.token, {
          expires: 7,
        });
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   ==================================== || LOGOUT || ====================================
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        Cookies.remove("_user_accessToken_");
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
