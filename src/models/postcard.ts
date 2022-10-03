import { DateTime } from 'luxon';
import { RawFabPostcard } from '../types';

export class Postcard {
  public id: number
  public messageId: number
  public userId: number
  public postcardImage: string
  public postcardVideo: string
  public thumbnail: string
  public type: number
  public isEncrypted: boolean
  public status: number
  public createdAt: DateTime
  public updatedAt: DateTime

  constructor (raw: RawFabPostcard) {
    this.id = raw.id
    this.messageId = raw.messageId
    this.userId = raw.userId
    this.postcardImage = raw.postcardImage
    this.postcardVideo = raw.postcardVideo
    this.thumbnail = raw.thumbnail
    this.type = raw.type
    this.isEncrypted = raw.isEncrypted === 'Y'
    this.status = raw.status
    this.createdAt = DateTime.fromMillis(raw.createdAt)
    this.updatedAt = DateTime.fromMillis(raw.updatedAt)
  }
}