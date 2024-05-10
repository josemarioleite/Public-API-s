import { HttpCliente } from './base.http'

export class BibleClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly _get = async () => {
    try {
      const { data } = await this.instance.get('bible/books')

      return data
    } catch (error) {
      console.log(error)
    }
  }

  public readonly _getByAbbrev = async (abbrev: string) => {
    try {
      const { data } = await this.instance.get(`bible/books/${abbrev}`)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  public readonly _getByVerseByAbbrev = async (version: string = 'acf', abbrev: string, chapter: number) => {
    try {
      const { data } = await this.instance.get(`bible/chapter/${version}/${abbrev}/${chapter}`)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  public readonly _getVersionsBible = async () => {
    try {
      const { data } = await this.instance.get(`bible/version`)

      return data
    } catch (error) {
      console.log(error)
    }
  }
}
