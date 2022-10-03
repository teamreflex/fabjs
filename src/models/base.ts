import { HTTPParams } from "../types"

export class BaseModel {
  protected httpParams: HTTPParams

  constructor(httpParams: HTTPParams) {
    this.httpParams = httpParams
  }

  public toJSON(): Omit<BaseModel, 'httpParams'> {
    return this
  }
}