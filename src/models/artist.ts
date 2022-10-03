import { DateTime } from 'luxon';
import { RawArtist } from './../types';

export class Artist {
  public id: number
  public artistUserId: number
  public groupId: number
  public agencyId: number
  public managerId: number
  public name: string
  public enName: string
  public bannerImage: string
  public launchImage: string
  public statusMessage: string
  public messageUpdatedAt: DateTime
  public isPublishable: boolean
  public affectionateName: string
  public groupName: string
  public groupEnName: string
  public agencyName: string
  public agencyEnName: string

  constructor (raw: RawArtist) {
    this.id = raw.id
    this.artistUserId = raw.artistUserId
    this.groupId = raw.groupId
    this.agencyId = raw.agencyId
    this.managerId = raw.managerId
    this.name = raw.name
    this.enName = raw.enName
    this.bannerImage = raw.bannerImage
    this.launchImage = raw.launchImage
    this.statusMessage = raw.statusMessage
    this.messageUpdatedAt = DateTime.fromMillis(raw.messageUpdatedAt)
    this.isPublishable = raw.isPublishable === 'Y'
    this.affectionateName = raw.affectionateName
    this.groupName = raw.groupName
    this.groupEnName = raw.groupEnName
    this.agencyName = raw.agencyName
    this.agencyEnName = raw.agencyEnName
  }
}