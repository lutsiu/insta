import mongoose from "mongoose";
export interface IUser {
  fullName: string,
  userName: string,
  password: string,
  email: string
  biography: string,
  profilePicture: string,
  posts: string[],
  postsWithUser: string[],
  likedPosts: string[],
  savedPosts: string[]
  followers: string[],
  following: string[],
  chats: string[],
  confirmationCode: number | null,
  userIsVerified: boolean,
  dateOfBirth: string
  resetToken?: string,
  resetTokenExpiration?: number;
}

export interface IMedia {
  filePath: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface IPost {
  media: IMedia[],
  likes: mongoose.Schema.Types.ObjectId[],
  comments: IComment[],
  saves: mongoose.Schema.Types.ObjectId[],
  description: String,
  localization: String,
  people: mongoose.Schema.Types.ObjectId[],
  isReel: boolean
}

export interface IComment {
  user: mongoose.Schema.Types.ObjectId,
  content: String,
  likes: mongoose.Schema.Types.ObjectId[],
  comments: IComment[]
}

export interface IMessage {
  sender: string;
  message: string;
  timeStamp: Date;
  media: IMedia,
  reactions: {
    user: mongoose.Schema.Types.ObjectId,
    content: String
  }[],
  reply?: {
    isReply: boolean;
    messageToReplyId: string;
    messageToReplyMessage: string;
    messageToReplyRecipientName: string;
    mediaPath?: string,
    mediaType?: string,
   
  };
}

export interface IChat {
  participants: mongoose.Schema.Types.ObjectId[],
  messages: IMessage[];
  
}