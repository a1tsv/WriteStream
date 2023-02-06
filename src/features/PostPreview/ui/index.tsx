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

interface IPostPreviewProps {
	post: IPost
}

export const PostPreview: FC<IPostPreviewProps> = ({ post }) => {
	return (
		<PostPreviewContent>
			<PostPreviewImg src={'#'} />
			<PostPreviewBody>
				<PostPreviewTitle>{post.title}</PostPreviewTitle>
				<PostPreviewText>{post.shortDescription}</PostPreviewText>
				<PostPreviewTime>
					{new Date(post.createdAt).toLocaleDateString()}
				</PostPreviewTime>
			</PostPreviewBody>
		</PostPreviewContent>
	)
}
