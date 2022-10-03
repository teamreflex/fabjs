import { RawFabImage } from "../types"

export class Image {
  public id: number
  public letterId: number
  public image: string

  constructor (raw: RawFabImage) {
    this.id = raw.id
    this.letterId = raw.letterId
    this.image = raw.image
  }
}