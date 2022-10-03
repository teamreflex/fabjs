import fetch from 'node-fetch'
import { Request, Response } from './types'

export const BASE_URI = 'https://vip-fab-api.myfab.tv/fapi/2'

/**
 * Make a request to the Fab API.
 * @param {Request} request
 * @param {string} request.method HTTP method
 * @param {string} request.path URI to query
 * @param {string} request.body Body to send
 * @param {string} request.userId User ID to use in query
 * @param {string} request.userAgent User agent to use in query
 * @param {string} request.accessToken User access token
 * @param {string} request.key Key to pluck data out the response
 * @returns {Promise<Response>}
 */
export const request = async <TReturnType>({ method, path, body, userId, userAgent, accessToken, key }: Request): Promise<Response<TReturnType>> => {
  try {
    const response = await fetch(`${BASE_URI}/${path}`, {
      method: method,
      body: body,
      headers: {
        'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
        userid: String(userId),
        "user-agent": userAgent,
        accesstoken: accessToken || '',
      },
    })
    const data: any = await response.json()

    // handle fab errors
    if (data.error) {
      let errorMessage = data.error.error_msg
      // handle version mismatch
      if (data.error.error_code === 1002) {
        errorMessage = 'Version mismatch, update the user agent'
      }

      return { error: errorMessage }
    }

    return { data: key ? data[key] : data }
  } catch (e) {
    return { error: e }
  }
}