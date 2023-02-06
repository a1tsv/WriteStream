import { PostBlogTitle, PostText } from '@pages/Post/ui/StyledPost'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface IPostSkeletonProps {
	count: number
}

export const PostSkeleton: FC<IPostSkeletonProps> = ({ count }) => {
	return (
		<>
			<PostBlogTitle>
				<Skeleton />
			</PostBlogTitle>
			<Skeleton />
			<Skeleton height={'400px'} width={'100%'} />
			<PostText>
				<Skeleton count={10} />
			</PostText>
		</>
	)
}
