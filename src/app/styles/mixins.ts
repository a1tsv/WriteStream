// const convertPxToEm = (px: number, current = 16) => {
// 	return `${px / current}em`
// }

// const convertPxToRem = (px: number) => {
// 	return `${px / 16}rem`
// }

export const fzRem = (size: number, base = 16) => `
  font-size: ${size}px;
  font-size: calc(${size / base} * 1rem);
// `
// export const av = (
// 	property: string,
// 	startSize: number,
// 	minSize: number,
// 	widthFrom = 1240,
// 	widthTo = 320,
// 	keepSize = 0
// ) => {
// 	const widthFromMedia = convertPxToEm(widthFrom)
// 	const widthToMedia = convertPxToEm(widthTo)

// 	const slope = (startSize - minSize) / (widthFrom - widthTo)
// }
