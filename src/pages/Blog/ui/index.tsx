import { Blog } from '@entities/Blog'
import { useGetBlogQuery } from '@entities/Blog/api'
import { BlogSkeleton } from '@entities/Blog/ui/BlogSkeleton'
import { useGetPostsQuery } from '@entities/Post'
import { PostPreview } from '@features/PostPreview/ui'
import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { StyledBlogItems, StyledBlogWrapper } from '@pages/Blog/ui/StyledBlog'
import { BackTo } from '@shared/ui/BackTo'
import { Typography } from '@shared/ui/Typography'
import { useParams } from 'react-router'

export const BlogPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: blog, isLoading: fetchingBlog } = useGetBlogQuery(id as string)
	const { data: posts, isLoading: fetchingPosts } = useGetPostsQuery()

	return (
		<div>
			<BackTo to={'/blogs'} text={'Back to blogs'} />
			{fetchingBlog && <BlogSkeleton count={1} />}
			<StyledBlogWrapper>{blog && <Blog blog={blog} />}</StyledBlogWrapper>
			<Typography as={'h2'} variant={'title'}>
				Posts
			</Typography>
			<StyledBlogItems>
				{fetchingPosts && <PostPreviewSkeleton count={6} />}
				{posts &&
					posts.items.map(post => <PostPreview key={post.id} post={post} />)}
			</StyledBlogItems>
		</div>
	)
}
