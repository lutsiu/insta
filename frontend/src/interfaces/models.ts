export interface IUser {
  _id: string,
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
  birthDate: string
}
