import { DateTime } from 'luxon';
import { RawFabComment } from '../types';

export class Comment {
  public id: number
  public messageId: number
  public parentId: number
  public pollId: number
  public userId: number
  public groupId: number
  public isGroup: boolean
  public type: number
  public comment: string
  public voiceComment?: string
  public status: number
  public createdAt: DateTime
  public updatedAt: DateTime
  public isArtist: boolean
  public name: string
  public enName: string
  public profileImage: string
  public userNickname: string
  public isLike: boolean
  public subComments: Comment[]
  public quotedComment?: string

  constructor (raw: RawFabComment) {
    this.id = raw.id
    this.messageId = raw.messageId
    this.parentId = raw.parentId
    this.pollId = raw.pollId
    this.userId = raw.userId
    this.groupId = raw.groupId
    this.isGroup = raw.isGroup === 'Y'
    this.type = raw.type
    this.comment = raw.comment
    this.voiceComment = raw.voiceComment
    this.status = raw.status
    this.createdAt = DateTime.fromMillis(raw.createdAt)
    this.updatedAt = DateTime.fromISO(raw.updatedAt)
    this.isArtist = raw.isArtist === 'Y'
    this.name = raw.name
    this.enName = raw.enName
    this.profileImage = raw.profileImage
    this.userNickname = raw.userNickname
    this.isLike = raw.isLike === 'Y'
    this.subComments = raw.subComments.map((comment) => new Comment(comment))
    this.quotedComment = raw.quotedComment
  }

  public get isVoiceComment(): boolean {
    return !!this.voiceComment
  }
}