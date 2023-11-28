import { createSlice } from "@reduxjs/toolkit";
import { IUserState, LoginAction } from "./interfaces";
const initialState: IUserState = {
  token: null,
  user: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: LoginAction) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setId(state, action: { payload: string }) {
      if (state.user) {
        state.user._id = action.payload;
      }
    },
    setFullName(state, action: { payload: string }) {
      if (state.user) {
        state.user.fullName = action.payload;
      }
    },
    setUserName(state, action: { payload: string }) {
      if (state.user) {
        state.user.userName = action.payload;
      }
    },
    setPassword(state, action: { payload: string }) {
      if (state.user) {
        state.user.password = action.payload;
      }
    },
    setEmail(state, action: { payload: string }) {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    setBiography(state, action: { payload: string }) {
      if (state.user) {
        state.user.biography = action.payload;
      }
    },
    setProfilePicture(state, action: { payload: string }) {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
  },
});

export default userReducer.reducer;
export const {
  setBiography,
  setFullName,
  setId,
  setProfilePicture,
  setPassword,
  setUserName,
  setEmail,
  login,
  logout,
} = userReducer.actions;
