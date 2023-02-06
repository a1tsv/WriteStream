import {
	BlogBody,
	BlogHeading,
	BlogText,
	BlogTitle,
	BlogWebsite,
	BlogWrapper
} from '@entities/Blog/ui/StyledBlog'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface IBlogSkeletonProps {
	count: number
}

export const BlogSkeleton: FC<IBlogSkeletonProps> = ({ count }) => {
	const countArray = Array.from(Array(count).keys())

	return (
		<>
			{countArray.map((_, i) => (
				<BlogWrapper key={i}>
					<Skeleton height={100} width={100} circle />
					<BlogBody>
						<BlogHeading>
							<BlogTitle>
								<Skeleton width={'100%'} />
							</BlogTitle>
							<BlogWebsite>
								<Skeleton />
							</BlogWebsite>
						</BlogHeading>
						<BlogText initialHeight={0} collapsed={false} ref={null}>
							<Skeleton height={100} />
						</BlogText>
					</BlogBody>
				</BlogWrapper>
			))}
		</>
	)
}
