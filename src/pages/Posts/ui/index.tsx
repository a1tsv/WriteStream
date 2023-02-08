import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { useGetPostsQuery } from '@entities/Post'
import { NavigationDropdown } from '@features/FilterDropdown'
import { PostPreview } from '@features/PostPreview'
import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { dropdownItems } from '@pages/Posts/model'
import { PostsFilters, PostsItems } from '@pages/Posts/ui/StyledPosts'
import { Button } from '@shared/ui/Button'
import { NotFound } from '@shared/ui/NotFound'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {
	// Vars
	const { id } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const { showModal } = useModalContext()

	// Api call
	const { data, isLoading } = useGetPostsQuery({
		model: params,
		blogId: id ? id : ''
	})
	const isItemsEmpty = !data?.items.length && !isLoading

	const openCreatePostModal = () => {
		showModal(ModalsEnum.ADD_POST, true, {})
	}

	return (
		<>
			<PostsFilters>
				<NavigationDropdown
					items={dropdownItems}
					params={params}
					setSearchParams={setSearchParams}
				/>
			</PostsFilters>
			<Button variant={'primary'} onClick={openCreatePostModal}>
				New post
			</Button>
			<PostsItems>
				{isLoading && <PostPreviewSkeleton count={3} />}
				{data?.items.length &&
					data.items.map(post => <PostPreview post={post} key={post.id} />)}
			</PostsItems>
			{isItemsEmpty && <NotFound label={'There is no posts yet 😔'} />}
		</>
	)
}
