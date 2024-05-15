import { HttpCliente } from './base.http'
import { CorRGB } from '../pages/colors/models.interface'

export class ColorClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly _post = async (colors: CorRGB) => {
    try {
      const { data } = await this.instance.post(`colors`, {colors})

      return data
    } catch (error) {
      console.log(error)
    }
  }
}
