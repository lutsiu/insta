import mongoose from "mongoose";
import { IUser } from "../interfaces/models.ts";

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    required: true,
    type: String,
    default: "",
    minlength: 2,
    maxlength: 50,
  },
  userName: {
    required: true,
    type: String,
    default: "",
    minlength: 2,
    maxlength: 40,
  },
  email: {
    required: true,
    type: String,
    default: "",
  },
  password: {
    required: true,
    type: String,
    default: "",
    minlength: 8,
  },
  biography: {
    required: false,
    type: String,
    default: "",
    maxlength: 200,
  },
  profilePicture: {
    required: false,
    type: String,
    default: "",
  },
  posts: {
    required: false,
    type: [String],
    default: [],
  },
  postsWithUser: {
    required: false,
    type: [String],
    default: [],
  },
  likedPosts: {
    required: false,
    type: [String],
    default: [],
  },
  savedPosts: {
    required: false,
    type: [String],
    default: [],
  },
  followers: {
    required: false,
    type: [String],
    default: [],
    ref: "User",
  },
  following: {
    required: false,
    type: [String],
    default: [],
    ref: "User",
  },
  chats: {
    required: false,
    type: [String],
    default: [],
  },
  confirmationCode: Number,
  userIsVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
