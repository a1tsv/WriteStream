import { IBlog } from '@entities/Blog'
import {
	BlogBody,
	BlogHeading,
	BlogImg,
	BlogText,
	BlogTitle,
	BlogWebsite,
	BlogWrapper
} from '@entities/Blog/ui/StyledBlog'
import { FC } from 'react'

interface IBlogProps {
	blog: IBlog
}

export const Blog: FC<IBlogProps> = ({ blog }) => {
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
				<BlogText>{blog.description}</BlogText>
			</BlogBody>
		</BlogWrapper>
	)
}
