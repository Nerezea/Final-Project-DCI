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
    image : localStorage.getItem("image"),
    userId : localStorage.getItem("userId")
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.fullName = action.payload.fullName;
      state.image = action.payload.image;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("fullName", action.payload.fullName);
      localStorage.setItem("image", action.payload.image);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = undefined;
      state.fullName = undefined;
      state.image = undefined;
      state.userId = undefined;
      localStorage.clear()
    },
    editProfileStore : (state,action)=>{
      state.fullName = action.payload.fullName;
      state.image = action.payload.image;
      localStorage.setItem("fullName", action.payload.fullName);
      localStorage.setItem("image", action.payload.image);
    }
  },
});

export const { login, logout,editProfileStore } = slice.actions;

export default slice.reducer;
