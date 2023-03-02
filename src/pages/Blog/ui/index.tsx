import { Blog, IBlog } from '@entities/Blog'
import { useGetBlogQuery } from '@entities/Blog/api'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { StyledBlogWrapper } from '@pages/Blog/ui/StyledBlog'
import { PostsPage } from '@pages/Posts'
import { BackTo } from '@shared/ui/BackTo'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { Flex } from '@shared/ui/Flex'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router'

export const BlogPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: blog, isLoading, error } = useGetBlogQuery(id as string)

	if (error && !blog) return <Navigate to={'/blogs'} />

	const breadcrumbs: IBreadCrumbsItem[] = useMemo(
		() => [
			{ link: 'blogs', title: 'Blogs' },
			{
				link: `blogs/${blog?.id ? blog.id : ''}`,
				title: blog?.name ? blog.name : ''
			}
		],
		[blog]
	)

	return (
		<>
			<Flex sx={{ marginBottom: '0.8rem' }}>
				<BreadCrumbs items={breadcrumbs} />
			</Flex>
			<Flex sx={{ marginBottom: '1.2rem' }}>
				<BackTo to={'/blogs'} text={'Back to blogs'} />
			</Flex>
			{isLoading ? (
				<BlogSkeleton count={1} />
			) : (
				<StyledBlogWrapper>{<Blog blog={blog as IBlog} />}</StyledBlogWrapper>
			)}
			<PostsPage />
		</>
	)
}
