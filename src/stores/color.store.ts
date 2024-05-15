import { defineStore } from 'pinia'
import { ColorClient } from '../http/colors.http'
import { CorRGB } from '../pages/colors/models.interface'
import { extractValuesRGB, generateColdColor, generateLightColor, formateToRGBString } from '../services/utils'

const colorClient = new ColorClient()

function generateColor () {
  let colors = []

  for (let i = 0; i < 3; i++) {
    colors.push(generateColdColor())
    colors.push(generateLightColor())
  }

  return {
    rgb: colors[0],
    numbers: extractValuesRGB(colors[2])
  }
}

export const useColorStore = defineStore('colorsstore', {
  state: () => ({
    isLoading: false,
    defaultColor: generateColor(),
    colorGenerated1: '',
    colorGenerated2: '',
    colorGenerated3: '',
    colorGenerated4: '',
    colorGenerated5: ''
  }),
  actions: {
    async setColor (isMounted: boolean, colors: number[] | null) {
      if (!isMounted) {
        this.changeLoading(true)
        const data = await colorClient._post(this.defaultColor.numbers as CorRGB)

        this.colorGenerated1 = formateToRGBString(data[0])
        this.colorGenerated2 = formateToRGBString(data[1])
        this.colorGenerated3 = formateToRGBString(data[2])
        this.colorGenerated4 = formateToRGBString(data[3])
        this.colorGenerated5 = formateToRGBString(data[4])

        this.changeLoading(false)
      }

      if (isMounted && colors) {
        const data = await colorClient._post(colors as CorRGB)

        this.colorGenerated1 = formateToRGBString(data[0])
        this.colorGenerated2 = formateToRGBString(data[1])
        this.colorGenerated3 = formateToRGBString(data[2])
        this.colorGenerated4 = formateToRGBString(data[3])
        this.colorGenerated5 = formateToRGBString(data[4])
      }
    },
    changeLoading (value: boolean) {
      this.isLoading = value
    }
  }
})
