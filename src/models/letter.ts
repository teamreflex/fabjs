import { DateTime } from 'luxon';
import { RawFabLetter } from '../types';
import { Image } from '.';

export class Letter {
  public id: number
  public messageId: number
  public userId: number
  public text: string
  public thumbnail: string
  public isEncrypted: boolean
  public status: number
  public createdAt: DateTime
  public updatedAt: DateTime
  public images: Image[]

  constructor (raw: RawFabLetter) {
    this.id = raw.id
    this.messageId = raw.messageId
    this.userId = raw.userId
    this.text = raw.text
    this.thumbnail = raw.thumbnail
    this.isEncrypted = raw.isEncrypted === 'Y'
    this.status = raw.status
    this.createdAt = DateTime.fromMillis(raw.createdAt)
    this.updatedAt = DateTime.fromMillis(raw.updatedAt)
    this.images = raw.images.map(image => new Image(image))
  }
}