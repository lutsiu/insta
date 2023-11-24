import mongoose from "mongoose";
import { IChat, IComment, IMessage, IPost } from "../interfaces/models";

const messageSchema = new mongoose.Schema<IMessage>({
  sender: String,
  message: String,
  media: [{
    filePath: String,
    fileName: String,
    fileType: String,
    fileSize: Number
  }],

  timeStamp: { type: Date, default: Date.now() },
  reply: {
    isReply: {
      type: Boolean,
      default: false,
    },
    messageToReplyId: {
      type: String,
      default: null,
    },
    messageToReplyMessage: String,
    messageToReplyRecipientName: String,
    mediaPath: {
      required: false,
      type: String
    },
    mediaType: {
      required: false,
      type: String
    }
  },
});

const chatSchema = new mongoose.Schema<IChat>({
  participants: [mongoose.Schema.Types.ObjectId],
  messages: [messageSchema],

});

const Post = mongoose.model("Chat", chatSchema)
export default Post;