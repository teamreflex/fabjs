import { RawArtistUser } from './types/raw-entities';
import EventEmitter from 'events'
import TypedEmitter from 'typed-emitter'
import { request } from './http'
import { ArtistUser, fetchMessagesForArtist, Group, Message, User } from './models'
import { ClientParams, FabEvents, LoginResult, RawFabUser, RawFabGroup, HTTPParams } from './types'

class FabEmitter extends (EventEmitter as new () => TypedEmitter<FabEvents>) {
  constructor() {
      super()
  }

  /**
   * @param {Error} err - The error to be emitted
   */
  error = (err: Error) => this.emit('error', err)

  /**
   * @param {boolean} initialized - whether initialization succeeded
   */
  ready = (initialized: boolean) => this.emit('init', initialized)
}

export class Fab extends FabEmitter {
  protected _accessToken?: string
  protected email?: string
  protected password?: string
  protected userId: number = 0
  protected userAgent: string
  protected _user?: User = undefined

  constructor(params: ClientParams) {
    super()

    this._accessToken = params.accessToken
    this.email = params.email
    this.password = params.password
    this.userAgent = params.userAgent

    if (!params.accessToken && (!params.email || !params.password)) {
      this.error(new Error('API key or email and password are required'))
      return
    }

    if (params.accessToken && !params.userId) {
      this.error(new Error('User ID is required when using an API key for authentication'))
      return
    }
  }

  /**
   * Fetch the currently logged in user using an access token.
   * @returns {Promise<RawFabUser>}
   */
  private async loginUsingAccessToken(): Promise<RawFabUser> {
    const { data, error } = await request<RawFabUser>({
      method: 'GET',
      path: `users/${this.userId}/info`,
      userId: this.userId,
      accessToken: this.accessToken,
      userAgent: this.userAgent,
      key: 'user',
    })

    if (!data || error) {
      this.error(new Error(error))
      throw new Error(error)
    }

    return data
  }

  /**
   * Fetch the currently logged in user using an credentials.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<LoginResult>}
   */
  private async loginUsingCredentials(email: string, password: string): Promise<LoginResult> {
    const { data, error } = await request<LoginResult>({
      method: 'POST',
      path: `signin`,
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      userId: 0,
      userAgent: this.userAgent,
    })

    if (!data || error) {
      throw new Error(error)
    }

    return data
  }

  /**
   * Initializes the client
   * @returns {Promise<void>}
   */
  public async init(): Promise<void> {
    if (this._accessToken) {
      const user = new User(await this.loginUsingAccessToken(), {
        userId: this.userId,
        accessToken: this.accessToken,
        userAgent: this.userAgent,
      })
      this.userId = user.id
      this._user = user
    }

    if (this.email && this.password) {
      const { login, user } = await this.loginUsingCredentials(this.email, this.password)
      this.userId = user.id
      this._accessToken = login.token
      this._user = new User(user, this.httpParams)
    }

    this.ready(this.userId > 0 && !!this._accessToken)
  }

  /**
   * Returns the HTTP parameters.
   * @returns {HTTPParams}
   */
  protected get httpParams(): HTTPParams {
    return {
      userId: this.userId,
      accessToken: this.accessToken,
      userAgent: this.userAgent,
    }
  }

  /**
   * Returns the currently loaded user.
   * @returns {User}
   */
  public get user(): User {
    if (!this._user) {
      throw new Error('User not initialized')
    }

    return this._user
  }

  /**
   * Returns the access token.
   * @returns {string}
   */
  public get accessToken(): string {
    if (!this._accessToken) {
      throw new Error('API key not set')
    }

    return this._accessToken
  }

  /**
   * Fetches a group by ID.
   * @param {number} groupId
   * @returns {Promise<Group>}
   */
  public async fetchGroup(groupId: number): Promise<Group> {
    const { data, error } = await request<RawFabGroup>({
      method: 'GET',
      path: `groups/${groupId}`,
      userId: this.userId,
      accessToken: this.accessToken,
      userAgent: this.userAgent,
      key: 'group',
    })

    if (!data || error) {
      throw new Error(error)
    }

    return new Group(data, this.httpParams)
  }

  /**
   * Fetches an artist by ID.
   * @param {number} artistId
   * @returns {Promise<ArtistUser>}
   */
  public async fetchArtist(artistId: number): Promise<ArtistUser> {
    const { data, error } = await request<RawArtistUser>({
      method: 'GET',
      path: `artists/${artistId}`,
      userId: this.userId,
      accessToken: this.accessToken,
      userAgent: this.userAgent,
      key: 'artistUser',
    })

    if (!data || error) {
      throw new Error(error)
    }

    return new ArtistUser(data, this.httpParams)
  }

  /**
   * Fetch the messages for the given artist.
   * @param {string} artistId
   * @returns {Promise<Message[]>}
   */
  public async fetchArtistMessages(artistId: number): Promise<Message[]> {
    return fetchMessagesForArtist(this.httpParams, artistId)
  }
}