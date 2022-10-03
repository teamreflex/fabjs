import { BaseModel, ArtistUser, Postcard, Letter, Comment } from '.';
import { HTTPParams, RawFabComment, RawFabMessage } from './../types';
import { DateTime } from 'luxon'
import { request } from '../http';

export class Message extends BaseModel {
  public id: number
  public userId: number
  public groupId: number
  public type: number
  public isGroup: boolean
  public status: number
  public publishedAt: number
  public createdAt: DateTime
  public updatedAt: DateTime
  public user: ArtistUser
  public postcard?: Postcard
  public letter?: Letter
  public isLike: boolean
  public isSave: boolean
  public isRead: boolean
  public likeCount: number
  public commentCount: number
  public isNewArtistUserComment: boolean

  constructor (raw: RawFabMessage, httpParams: HTTPParams) {
    super(httpParams)

    this.id = raw.id
    this.userId = raw.userId
    this.groupId = raw.groupId
    this.type = raw.type
    this.isGroup = raw.isGroup === 'Y'
    this.status = raw.status
    this.publishedAt = raw.publishedAt
    this.createdAt = DateTime.fromMillis(raw.createdAt)
    this.updatedAt = DateTime.fromMillis(raw.updatedAt)
    this.user = new ArtistUser(raw.user, httpParams)
    this.postcard = raw.postcard ? new Postcard(raw.postcard) : undefined
    this.letter = raw.letter ? new Letter(raw.letter) : undefined
    this.isLike = raw.isLike === 'Y'
    this.isSave = raw.isSave === 'Y'
    this.isRead = raw.isRead === 'Y'
    this.likeCount = raw.likeCount
    this.commentCount = raw.commentCount
    this.isNewArtistUserComment = raw.isNewArtistUserComment === 'Y'
  }

  /**
   * Checks if this message is a letter or not.
   * @returns {boolean}
   */
  public get isLetter(): boolean {
    return this.letter instanceof Letter
  }

  /**
   * Pays for the message and returns the full data.
   * @returns {Promise<Message>}
   */
  public async payForMessage(): Promise<Message> {
    const fullMessage = await payForMessage(this.httpParams, this.id)
    this.letter = fullMessage.letter
    this.postcard = fullMessage.postcard
    return fullMessage
  }

  /**
   * Fetch comments for this message.
   * @returns {Promise<Comment[]>}
   */
  public async fetchComments(): Promise<Comment[]> {
    const { data, error } = await request<RawFabComment[]>({
      method: 'GET',
      path: `users/${this.httpParams.userId}/messages/${this.id}/ncomments`,
      key: 'comments',
      ...this.httpParams
    })
  
    if (!data || error) {
      throw new Error(error)
    }
  
    return data.map((comment) => new Comment(comment))
  }
}

/**
 * Fetch the full message for the given message ID.
 * @param {HTTPParams} http
 * @param {string} http.userId 
 * @param {string} http.accessToken 
 * @param {string} http.userAgent 
 * @param {number} messageId
 * @returns {Promise<Message>}
 */
export async function payForMessage({ userId, accessToken, userAgent }: HTTPParams, messageId: number): Promise<Message> {
  const { data, error } = await request<RawFabMessage>({
    method: 'GET',
    path: `users/${userId}/messages/${messageId}`,
    userId: userId,
    accessToken: accessToken,
    userAgent: userAgent,
    key: 'message',
  })

  if (!data || error) {
    throw new Error(error)
  }

  return new Message(data, {
    userId, accessToken, userAgent
  })
}