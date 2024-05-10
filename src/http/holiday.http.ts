import { HttpCliente } from './base.http'

export class HolidayClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly _get = async (year: number) => {
    try {
      const { data } = await this.instance.get(`holiday/${year}/BR`)

      return data
    } catch (error) {
      console.log(error)
    }
  }
}
