import { Blog } from '@entities/Blog'
import { useGetBlogQuery } from '@entities/Blog/api'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { StyledBlogWrapper } from '@pages/Blog/ui/StyledBlog'
import { PostsPage } from '@pages/Posts'
import { BackTo } from '@shared/ui/BackTo'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { Navigate, useParams } from 'react-router'

export const BlogPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: blog, isLoading, error } = useGetBlogQuery(id as string)

	if (error) return <Navigate to={'/blogs'} />

	const breadcrumbs: IBreadCrumbsItem[] = [
		{ link: 'blogs', title: 'Blogs' },
		{
			link: `blogs/${blog?.id ? blog.id : ''}`,
			title: blog?.name ? blog.name : ''
		}
	]

	return (
		<>
			<BreadCrumbs items={breadcrumbs} />
			<BackTo to={'/blogs'} text={'Back to blogs'} />
			{isLoading ? (
				<BlogSkeleton count={1} />
			) : (
				<StyledBlogWrapper>{<Blog blog={blog} />}</StyledBlogWrapper>
			)}
			<PostsPage />
		</>
	)
}
