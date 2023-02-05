// const convertPxToEm = (px: number, current = 16) => {
// 	return `${px / current}em`
// }

// const convertPxToRem = (px: number) => {
// 	return `${px / 16}rem`
// }

export const fzRem = (size: number, base = 16) => `
  font-size: ${size}px;
  font-size: calc(${size / base} * 1rem);
`

const rem = (px: number) => {
	return `${px / 16}rem`
}
