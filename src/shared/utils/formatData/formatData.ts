export const formatData = (timestamp: string) => {
	if (timestamp === '') return
	return new Date(timestamp).toLocaleDateString()
}
