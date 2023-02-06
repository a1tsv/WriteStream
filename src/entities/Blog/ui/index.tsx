import { IBlog } from '@entities/Blog'
import {
	BlogBody,
	BlogHeading,
	BlogImg,
	BlogShowMore,
	BlogText,
	BlogTitle,
	BlogWebsite,
	BlogWrapper
} from '@entities/Blog/ui/StyledBlog'
import { FC, useRef, useState } from 'react'
import { BiUpArrow } from 'react-icons/all'

interface IBlogProps {
	blog: IBlog
}

export const Blog: FC<IBlogProps> = ({ blog }) => {
	const blogText =
		'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.  lorem ipsum dolor sit amet consectetur adipisicing elit.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.  lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'
	// const isTextLong = blogText.length > 200
	const isTextLong = blog.description.length > 200
	const [isCollapsed, setIsCollapsed] = useState(isTextLong)
	const showMoreRef = useRef<HTMLParagraphElement>(null)
	const initialTextHeight = showMoreRef?.current?.scrollHeight

	const handleShowMore = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<BlogWrapper>
			<BlogImg />
			<BlogBody>
				<BlogHeading>
					<BlogTitle>{blog.name}</BlogTitle>
					<BlogWebsite>
						Website: <a href={blog.websiteUrl}>{blog.websiteUrl}</a>
					</BlogWebsite>
				</BlogHeading>
				<BlogText
					initialHeight={initialTextHeight}
					collapsed={isCollapsed}
					ref={showMoreRef}
				>
					{/*{blogText}*/}
					{blog.description}
				</BlogText>
				{isTextLong && (
					<BlogShowMore collapsed={isCollapsed} onClick={handleShowMore}>
						{isCollapsed ? 'Show more' : 'Show less'}
						<BiUpArrow />
					</BlogShowMore>
				)}
			</BlogBody>
		</BlogWrapper>
	)
}
