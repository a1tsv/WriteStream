import { useGetPostsQuery } from '@entities/Post'
import { PostPreview } from '@features/PostPreview'
import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { dropdownItems } from '@pages/Posts/model'
import { PostsFilters, PostsItems } from '@pages/Posts/ui/StyledPosts'
import { Dropdown } from '@shared/ui/Dropdown'
import { getOptionTitleByValue } from '@shared/utils/getOptionTitleByValue'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams)

	// Api call
	const { data, isLoading, isError } = useGetPostsQuery(params)

	// Local states
	const [selectedItem, setSelectedItem] = useState<string>(
		getOptionTitleByValue(dropdownItems, params.sortDirection) ||
			dropdownItems[0].title
	)

	// Utils
	const handleSelectedChange = (value: string) => {
		setSelectedItem(getOptionTitleByValue(dropdownItems, value) as string)
		setSearchParams({ ...params, sortDirection: value })
	}

	return (
		<>
			<PostsFilters>
				<Dropdown
					onChangeCb={handleSelectedChange}
					button={'Dropdown'}
					items={dropdownItems}
					selected={selectedItem}
					sx={{ width: '200px' }}
				/>
			</PostsFilters>
			<PostsItems>
				{isLoading && <PostPreviewSkeleton count={3} />}
				{data?.items &&
					data.items.map(post => <PostPreview post={post} key={post.id} />)}
			</PostsItems>
		</>
	)
}
