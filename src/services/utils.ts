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
