import { BaseModel, ArtistUser } from '.';
import { HTTPParams, RawFabUser } from './../types';
import { DateTime } from 'luxon'

export class User extends BaseModel {
  public id: number
  public email: string
  public nickName: string
  public profileImage: string
  public birthday: string
  public type: number
  public isAllowMessagePush: boolean
  public isAllowCommentPush: boolean
  public status: number
  public birthdayUpdatedAt: DateTime
  public createdAt: DateTime
  public updatedAt: DateTime
  public fanletterCount: number
  public follows: ArtistUser[]
  public followCount: number
  public savedMessageCount: number
  public points: number

  constructor (raw: RawFabUser, httpParams: HTTPParams) {
    super(httpParams)

    this.id = raw.id
    this.email = raw.email
    this.nickName = raw.nickName
    this.profileImage = raw.profileImage
    this.birthday = raw.birthday
    this.type = raw.type
    this.isAllowMessagePush = raw.isAllowMessagePush === 'Y'
    this.isAllowCommentPush = raw.isAllowCommentPush === 'Y'
    this.status = raw.status
    this.birthdayUpdatedAt = DateTime.fromMillis(raw.birthdayUpdatedAt)
    this.createdAt = DateTime.fromMillis(raw.createdAt)
    this.updatedAt = DateTime.fromMillis(raw.updatedAt)
    this.fanletterCount = raw.fanletterCount
    this.follows = raw.follows.map(follow => new ArtistUser(follow, httpParams))
    this.followCount = raw.followCount
    this.savedMessageCount = raw.savedMessageCount
    this.points = raw.points
  }
}