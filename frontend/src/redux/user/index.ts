import { createSlice } from "@reduxjs/toolkit";
import { IUserState, LoginAction, SignUpStep1Action } from "./interfaces";
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
    setId(state, action: {payload: string}) {
      if (!state.user) return;
      state.user._id = action.payload;
    },
    setDateOfBirth(state, action: {payload: string }) {
      if (!state.user) return;
      state.user.dateOfBirth = action.payload;
    },
    signUpStep1(state, action: SignUpStep1Action) {
      const { email, userName, fullName, password} = action.payload;
      state.user = {
        _id: "",
        biography: "",
        dateOfBirth: "",
        chats: [],
        confirmationCode: 0,
        email,
        followers: [],
        following: [],
        fullName,
        likedPosts: [],
        password,
        posts: [],
        postsWithUser: [],
        profilePicture: "",
        savedPosts: [],
        userIsVerified: false,
        userName,
      };
    },
  },
});

export default userReducer.reducer;
export const { login, logout, signUpStep1,setId, setDateOfBirth } = userReducer.actions;
