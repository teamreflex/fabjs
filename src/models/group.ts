import { RawFabGroup, HTTPParams } from './../types';
import { BaseModel, ArtistUser } from '.';
import { DateTime } from "luxon"

export class Group extends BaseModel {
  public id: number
  public agencyId: number
  public managerId: number
  public name: string
  public enName: string
  public profileImage: string
  public bannerImage: string
  public launchImage: string
  public statusMessage: string
  public messageUpdatedAt: DateTime
  public youtube: string
  public twitter: string
  public instagram: string
  public vlive: string
  public cafe: string
  public isSolo: boolean
  public artistUsers: ArtistUser[]
  public agencyName: string
  public agencyEnName: string
  public isFollow: boolean

  constructor(raw: RawFabGroup, httpParams: HTTPParams) {
    super(httpParams)

    this.id = raw.id
    this.agencyId = raw.agencyId
    this.managerId = raw.managerId
    this.name = raw.name
    this.enName = raw.enName
    this.profileImage = raw.profileImage
    this.bannerImage = raw.bannerImage
    this.launchImage = raw.launchImage
    this.statusMessage = raw.statusMessage
    this.messageUpdatedAt = DateTime.fromMillis(raw.messageUpdatedAt)
    this.youtube = raw.youtube
    this.twitter = raw.twitter
    this.instagram = raw.instagram
    this.vlive = raw.vlive
    this.cafe = raw.cafe
    this.isSolo = raw.isSolo === 'Y'
    this.artistUsers = raw.artistUsers.map(artistUser => new ArtistUser(artistUser, httpParams))
    this.agencyName = raw.agencyName
    this.agencyEnName = raw.agencyEnName
    this.isFollow = raw.isFollow === 'Y'
  }
}