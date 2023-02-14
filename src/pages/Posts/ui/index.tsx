import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { useGetBlogQuery } from '@entities/Blog/api'
import { useGetPostsQuery } from '@entities/Post'
import { NavigationDropdown } from '@features/FilterDropdown'
import { PostPreview } from '@features/PostPreview'
import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { dropdownItems } from '@pages/Posts/model'
import { PostsFilters, PostsItems } from '@pages/Posts/ui/StyledPosts'
import { useObserver } from '@shared/hooks'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { Button } from '@shared/ui/Button'
import { InvisibleElement } from '@shared/ui/InvisibleElement/ui'
import { NotFound } from '@shared/ui/NotFound'
import { anotherItemsExist } from '@shared/utils/anotherItemsExist'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {
	// Vars
	const { id } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])

	const { showModal } = useModalContext()
	const blogId = id ? id : ''

	const breadcrumbs: IBreadCrumbsItem[] = useMemo(
		() => [{ link: 'posts', title: 'Posts' }],
		[]
	)

	const bottomElement = useRef<HTMLDivElement>(null)

	// Local states
	const [pageSize, setPageSize] = useState(10)

	// Api call
	const { data, isLoading } = useGetPostsQuery({
		model: { ...params, pageSize },
		blogId
	})
	const { data: blog } = useGetBlogQuery(blogId, { skip: !!blogId })
	const isItemsEmpty = !data?.items.length && !isLoading
	const anotherPostsExist = anotherItemsExist(data)

	const openCreatePostModal = () => {
		showModal(ModalsEnum.ADD_POST, true, {
			post: { blogId, blogName: blog?.name }
		})
	}

	const changePageSize = useCallback(() => {
		setPageSize(prev => prev + 10)
	}, [pageSize])

	useObserver(bottomElement, changePageSize, isLoading, anotherPostsExist)

	return (
		<>
			<BreadCrumbs items={breadcrumbs} />
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
				{!isItemsEmpty &&
					data?.items.map(post => <PostPreview post={post} key={post.id} />)}
			</PostsItems>
			<InvisibleElement ref={bottomElement} />
			{isItemsEmpty && <NotFound label={'There is no posts yet 😔'} />}
		</>
	)
}
