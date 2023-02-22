import { getItemFromLC } from '@shared/utils/localStorage'

export const getBearerToken = () => {
	const accessToken = getItemFromLC('accessToken') as string
	return accessToken ? `Bearer ${accessToken}` : ''
}
