import { useModalContext } from '@app/providers/ModalsProvider'
import { IBlog } from '@entities/Blog'
import { dropdownItems } from '@entities/Blog/model'
import {
	BlogBody,
	BlogHeading,
	BlogHeadingInfo,
	BlogImgPlaceholder,
	BlogShowMore,
	BlogText,
	BlogTitle,
	BlogWebsite,
	BlogWrapper
} from '@entities/Blog/ui/StyledBlog'
import { Dropdown } from '@shared/ui/Dropdown'
import { FC, memo, useRef, useState } from 'react'
import { BiDotsVerticalRounded, BiUpArrow } from 'react-icons/bi'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

interface IBlogProps {
	blog: IBlog
}

export const Blog: FC<IBlogProps> = memo(({ blog }) => {
	// Show more
	const isTextLong = blog.description.length > 200
	const [isCollapsed, setIsCollapsed] = useState(isTextLong)
	const showMoreRef = useRef<HTMLParagraphElement>(null)
	const initialTextHeight = showMoreRef?.current?.scrollHeight
	const { showModal } = useModalContext()

	// Link
	const { id } = useParams<{ id: string }>()
	const shouldNavigate = id

	const handleShowMore = () => {
		setIsCollapsed(!isCollapsed)
	}

	const handleBlogOperation = (value: string) => {
		showModal(value, true, { title: blog.name, id: blog.id })
	}

	return (
		<BlogWrapper>
			{/*<BlogImg />*/}
			<BlogImgPlaceholder />
			<BlogBody>
				<BlogHeading>
					<BlogHeadingInfo>
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
					</BlogHeadingInfo>
					<Dropdown
						button={BiDotsVerticalRounded}
						onChangeCb={handleBlogOperation}
						items={dropdownItems}
					/>
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
})
