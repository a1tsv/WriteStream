import { PostBlogTitle, PostText } from '@pages/Post/ui/StyledPost'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

export const PostSkeleton: FC = () => {
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
