import { BaseModel, Artist, Message } from '.';
import { HTTPParams, RawArtistUser, RawFabMessage } from './../types';
import { DateTime } from 'luxon';
import { request } from '../http';

export class ArtistUser extends BaseModel {
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
  public artist: Artist
  public isFollow: boolean
  public followedUpdatedAt: DateTime

  constructor (raw: RawArtistUser, httpParams: HTTPParams) {
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
    this.artist = new Artist(raw.artist)
    this.isFollow = raw.isFollow === 'Y'
    this.followedUpdatedAt = DateTime.fromMillis(raw.followedUpdatedAt)
  }

  /**
   * Fetch messages for this artist.
   * @returns {Promise<Message[]>}
   */
  public async fetchMessages(): Promise<Message[]> {
    return fetchMessagesForArtist(this.httpParams, this.id)
  }
}

/**
 * Fetch messages for the given artist.
 * @param {HTTPParams} http
 * @param {string} http.userId 
 * @param {string} http.accessToken 
 * @param {string} http.userAgent 
 * @param {number} artistId
 * @returns {Promise<Message[]>}
 */
export async function fetchMessagesForArtist({ userId, accessToken, userAgent }: HTTPParams, artistId: number): Promise<Message[]> {
  const { data, error } = await request<RawFabMessage[]>({
    method: 'GET',
    path: `artists/${artistId}/messages`,
    userId: userId,
    accessToken: accessToken,
    userAgent: userAgent,
    key: 'messages',
  })

  if (!data || error) {
    throw new Error(error)
  }

  return data.map(message => new Message(message, {
    userId, accessToken, userAgent
  }))
}