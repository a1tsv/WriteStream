export const fzRem = (size: number, base = 16) => `
  font-size: ${size}px;
  font-size: calc(${size / base} * 1rem);
`

export const rem = (px: number) => {
	return `${px / 16}rem`
}
