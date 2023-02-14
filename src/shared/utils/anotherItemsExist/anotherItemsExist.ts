import { IGetItemsResponse } from '@shared/api/api.interface'

export const anotherItemsExist = (data?: IGetItemsResponse<any>) => {
	if (!data) return false
	return data?.items ? data?.items?.length < data?.totalCount : false
}
