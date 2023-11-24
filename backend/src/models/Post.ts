import mongoose from "mongoose";
import { IComment, IPost } from "../interfaces/models";

const commentSchema = new mongoose.Schema<IComment>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    required: false,
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  comments: {
    type: [Object],
    default: []
  }
});

const postSchema = new mongoose.Schema<IPost>({
  media: [{
    filePath: String,
    fileName: String,
    fileType: String,
    fileSize: Number
  }],
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  saves: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  description: {
    required: false,
    type: String, 
    max: 1000
  },
  localization: String,
  people: {
    required: false,
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  isReel: {
    required: true,
    type: Boolean
  },
  comments: commentSchema
});

const Post = mongoose.model("Post", postSchema)
export default Post;