import { Blog } from '@entities/Blog'
import { useGetBlogQuery } from '@entities/Blog/api'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { StyledBlogWrapper } from '@pages/Blog/ui/StyledBlog'
import { PostsPage } from '@pages/Posts'
import { BackTo } from '@shared/ui/BackTo'
import { useParams } from 'react-router'

export const BlogPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: blog, isLoading: fetchingBlog } = useGetBlogQuery(id as string)

	return (
		<div>
			<BackTo to={'/blogs'} text={'Back to blogs'} />
			{fetchingBlog && <BlogSkeleton count={1} />}
			<StyledBlogWrapper>{blog && <Blog blog={blog} />}</StyledBlogWrapper>
			<PostsPage />
		</div>
	)
}
