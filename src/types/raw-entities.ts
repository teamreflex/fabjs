import { FabBoolean } from '.';

export type RawArtist = {
  id: number
  artistUserId: number
  groupId: number
  agencyId: number
  managerId: number
  name: string
  enName: string
  bannerImage: string
  launchImage: string
  statusMessage: string
  messageUpdatedAt: number
  isPublishable: FabBoolean
  affectionateName: string
  groupName: string
  groupEnName: string
  agencyName: string
  agencyEnName: string
}

export type RawArtistUser = {
  id: number
  email: string
  nickName: string
  profileImage: string
  birthday: string
  type: number
  isAllowMessagePush: FabBoolean
  isAllowCommentPush: FabBoolean
  status: number
  birthdayUpdatedAt: number
  createdAt: number
  updatedAt: number
  artist: RawArtist
  isFollow: FabBoolean
  followedUpdatedAt: number
}

export type RawFabUser = {
  id: number
  email: string
  nickName: string
  profileImage: string
  birthday: string
  type: number
  isAllowMessagePush: FabBoolean
  isAllowCommentPush: FabBoolean
  status: number
  birthdayUpdatedAt: number
  createdAt: number
  updatedAt: number
  fanletterCount: number
  follows: RawArtistUser[]
  followCount: number
  savedMessageCount: number
  points: number
}

export type RawFabGroup = {
  id: number
  agencyId: number
  managerId: number
  name: string
  enName: string
  profileImage: string
  bannerImage: string
  launchImage: string
  statusMessage: string
  messageUpdatedAt: number
  youtube: string
  twitter: string
  instagram: string
  vlive: string
  cafe: string
  isSolo: FabBoolean
  artistUsers: RawArtistUser[]
  agencyName: string
  agencyEnName: string
  isFollow: FabBoolean
}

export type RawFabPostcard = {
  id: number
  messageId: number
  userId: number
  postcardImage: string
  postcardVideo: string
  thumbnail: string
  type: number
  isEncrypted: FabBoolean
  status: number
  createdAt: number
  updatedAt: number
}

export type RawFabImage = {
  id: number
  letterId: number
  image: string
}

export type RawFabLetter = {
  id: number
  messageId: number
  userId: number
  text: string
  thumbnail: string
  isEncrypted: FabBoolean
  status: number
  createdAt: number
  updatedAt: number
  images: RawFabImage[]
}

export type RawFabMessage = {
  id: number
  userId: number
  groupId: number
  type: number
  isGroup: FabBoolean
  status: number
  publishedAt: number
  createdAt: number
  updatedAt: number
  user: RawArtistUser
  postcard?: RawFabPostcard
  letter?: RawFabLetter
  isLike: FabBoolean
  isSave: FabBoolean
  isRead: FabBoolean
  likeCount: number
  commentCount: number
  isNewArtistUserComment: FabBoolean
}

export type RawFabComment = {
  id: number
  messageId: number
  parentId: number
  pollId: number
  userId: number
  groupId: number
  isGroup: FabBoolean
  type: number
  comment: string
  voiceComment?: string
  status: number
  createdAt: number
  updatedAt: string
  isArtist: FabBoolean
  name: string
  enName: string
  profileImage: string
  userNickname: string
  isLike: FabBoolean
  subComments: RawFabComment[]
  quotedComment?: string
}