import { useGetPostsQuery } from '@entities/Post'
import { NavigationDropdown } from '@features/FilterDropdown'
import { PostPreview } from '@features/PostPreview'
import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { dropdownItems } from '@pages/Posts/model'
import { PostsFilters, PostsItems } from '@pages/Posts/ui/StyledPosts'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {
	// Vars
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams)

	// Api call
	const { data, isLoading } = useGetPostsQuery(params)

	return (
		<>
			<PostsFilters>
				<NavigationDropdown
					items={dropdownItems}
					params={params}
					setSearchParams={setSearchParams}
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
