import { createSlice } from "@reduxjs/toolkit";

export const Roles = {
  PARENT: "parent",
  MANAGER: "manager",
  TEACHER: "teacher",
  SUPER_ADMIN: "superAdmin",
};

const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    role: localStorage.getItem("role"),
    fullName: localStorage.getItem("fullName"),
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.fullName = action.payload.fullName;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("fullName", action.payload.fullName);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = undefined;
      state.fullName = undefined;
      localStorage.clear()
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
