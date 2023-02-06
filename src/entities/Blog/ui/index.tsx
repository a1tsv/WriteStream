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
import { BiUpArrow } from 'react-icons/bi'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

interface IBlogProps {
	blog: IBlog
}

export const Blog: FC<IBlogProps> = ({ blog }) => {
	// Show more
	const isTextLong = blog.description.length > 200
	const [isCollapsed, setIsCollapsed] = useState(isTextLong)
	const showMoreRef = useRef<HTMLParagraphElement>(null)
	const initialTextHeight = showMoreRef?.current?.scrollHeight

	// Link
	const { id } = useParams<{ id: string }>()
	const shouldNavigate = id

	const handleShowMore = () => {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<BlogWrapper>
			<BlogImg />
			<BlogBody>
				<BlogHeading>
					{shouldNavigate ? (
						<BlogTitle>{blog.name}</BlogTitle>
					) : (
						<NavLink to={`/blogs/${blog.id}`}>
							<BlogTitle>{blog.name}</BlogTitle>
						</NavLink>
					)}
					<BlogWebsite>
						Website: <a href={blog.websiteUrl}>{blog.websiteUrl}</a>
					</BlogWebsite>
				</BlogHeading>
				<BlogText
					initialHeight={initialTextHeight}
					collapsed={isCollapsed}
					ref={showMoreRef}
				>
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
