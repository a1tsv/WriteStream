export const formatDate = (timestamp: string) => {
	if (timestamp === '') return
	return new Date(timestamp).toLocaleDateString()
}
