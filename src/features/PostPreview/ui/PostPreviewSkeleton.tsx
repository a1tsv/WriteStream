import {
	PostPreviewBody,
	PostPreviewContent,
	PostPreviewText,
	PostPreviewTime,
	PostPreviewTitle
} from '@features/PostPreview/ui/StyledPostPreview'
import { getArrayFromLength } from '@shared/utils/getArrayFromLength'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface IPostPreviewSkeletonProps {
	count: number
}

export const PostPreviewSkeleton: FC<IPostPreviewSkeletonProps> = ({
	count
}) => {
	const countArray = getArrayFromLength(count)

	return (
		<>
			{countArray.map((_, i) => (
				<PostPreviewContent key={i}>
					<Skeleton width={'100%'} height={150} />
					<PostPreviewBody>
						<PostPreviewTitle>
							<Skeleton />
						</PostPreviewTitle>
						<PostPreviewText>
							<Skeleton />
						</PostPreviewText>
						<PostPreviewTime>
							<Skeleton />
						</PostPreviewTime>
					</PostPreviewBody>
				</PostPreviewContent>
			))}
		</>
	)
}
