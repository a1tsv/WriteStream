import { useGetCommentsQuery, useGetPostQuery } from '@entities/Post'
import { useRatePostMutation } from '@entities/Post/api'
import { PostSkeleton } from '@pages/Post/ui/PostSkeleton'
import {
	PostBlogTitle,
	PostDate,
	PostHeading,
	PostImg,
	PostMembership,
	PostText,
	PostTitle,
	PostWrapper
} from '@pages/Post/ui/StyledPost'
import { TRateStatuses } from '@shared/api/api.interface'
import { BackTo } from '@shared/ui/BackTo'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { Flex } from '@shared/ui/Flex'
import { NotFound } from '@shared/ui/NotFound'
import { formatData } from '@shared/utils/formatData'
import { Comments } from '@widgets/Comments'
import { Rates } from '@widgets/Rates'
import { useMemo } from 'react'
import { useParams } from 'react-router'

export const PostPage = () => {
	// Params
	const { id } = useParams<{ id: string }>()

	// Api calls
	const { data: post, isLoading } = useGetPostQuery(id as string)
	const { data: commentsData, isLoading: fetchingComments } =
		useGetCommentsQuery(id as string)
	const [ratePost, { isLoading: ratingPost }] = useRatePostMutation()

	// Vars
	const breadcrumbs: IBreadCrumbsItem[] = useMemo(
		() => [
			{ link: 'posts', title: 'Posts' },
			{
				link: `posts/${post?.id ? post.id : ''}`,
				title: post?.title ? post.title : ''
			}
		],
		[post]
	)

	// Handlers
	const handleRatePost = (likeStatus: TRateStatuses) => {
		const myStatus = post?.extendedLikesInfo.myStatus
		const currentRate = myStatus === likeStatus ? 'None' : likeStatus
		const ratePayload = { id: id as string, likeStatus: currentRate }
		ratePost(ratePayload)
	}

	return (
		<div>
			<Flex sx={{ marginBottom: '0.8rem' }}>
				<BreadCrumbs items={breadcrumbs} />
			</Flex>
			<Flex sx={{ marginBottom: '1.2rem' }}>
				<BackTo to={'/posts'} text={'Back to posts'} />
			</Flex>

			{post && !fetchingComments ? (
				<>
					<PostWrapper>
						<PostBlogTitle>{post.blogName}</PostBlogTitle>
						<PostHeading>
							<PostTitle>{post.title}</PostTitle>
							<PostMembership>(For public posts)</PostMembership>
							<PostDate>{formatData(post.createdAt)}</PostDate>
							<Rates
								{...post.extendedLikesInfo}
								isLoading={ratingPost}
								handleRate={handleRatePost}
							/>
						</PostHeading>
						<PostImg />
						<PostText>{post.content}</PostText>
					</PostWrapper>
					<Comments items={commentsData?.items || []} />
				</>
			) : isLoading || fetchingComments ? (
				<PostSkeleton />
			) : (
				<NotFound label={'Post not found 😔'} />
			)}
		</div>
	)
}
