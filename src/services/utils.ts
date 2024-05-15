export function generateLightColor () {
  const minColor = 180

  const red = Math.floor(Math.random() * (255 - minColor + 1)) + minColor
  const green = Math.floor(Math.random() * (255 - minColor + 1)) + minColor
  const blue = Math.floor(Math.random() * (255 - minColor + 1)) + minColor

  return `rgb(${red}, ${green}, ${blue})`
}

export function generateColdColor () {
  const minBlue = 180

  const red = Math.floor(Math.random() * 100)
  const green = Math.floor(Math.random() * 150)
  const blue = Math.floor(Math.random() * (255 - minBlue + 1)) + minBlue

  return `rgb(${red}, ${green}, ${blue})`
}

export function formateToRGBString (valueRgb: number[]): string {
  return `rgb(${valueRgb[0]}, ${valueRgb[1]}, ${valueRgb[2]})`
}

export function extractValuesRGB (rgbString: string): number[] {
  const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
  const matches = rgbString.match(regex)

  if (matches && matches.length === 4) {
      const r = parseInt(matches[1])
      const g = parseInt(matches[2])
      const b = parseInt(matches[3])

      return [r, g, b]
  } else {
      return []
  }
}
