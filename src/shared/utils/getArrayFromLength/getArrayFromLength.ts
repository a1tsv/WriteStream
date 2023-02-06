export const getArrayFromLength = (count: number) => {
	if (!Number.isFinite(count) || count < 1) return []
	return Array.from(Array(count).keys())
}
