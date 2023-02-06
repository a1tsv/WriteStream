import { IPost } from '@entities/Post'
import {
	PostPreviewBody,
	PostPreviewContent,
	PostPreviewImg,
	PostPreviewText,
	PostPreviewTime,
	PostPreviewTitle
} from '@features/PostPreview/ui/StyledPostPreview'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface IPostPreviewProps {
	post: IPost
}

export const PostPreview: FC<IPostPreviewProps> = ({ post }) => {
	return (
		<PostPreviewContent>
			<PostPreviewImg src={'#'} />
			<PostPreviewBody>
				<NavLink to={`/posts/${post.id}`}>
					<PostPreviewTitle>{post.title}</PostPreviewTitle>
				</NavLink>
				<PostPreviewText>{post.shortDescription}</PostPreviewText>
				<PostPreviewTime>
					{new Date(post.createdAt).toLocaleDateString()}
				</PostPreviewTime>
			</PostPreviewBody>
		</PostPreviewContent>
	)
}
