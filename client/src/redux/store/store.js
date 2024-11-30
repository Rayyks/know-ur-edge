import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import { postApiSlice } from "@/redux/slices/postApiSlice";
import { userApiSlice } from "@/redux/slices/userApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApiSlice.middleware)
      .concat(userApiSlice.middleware),
});

export default store;
