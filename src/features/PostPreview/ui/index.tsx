import { useModalContext } from '@app/providers/ModalsProvider'
import { IPost } from '@entities/Post'
import { dropdownItems } from '@features/PostPreview/model'
import {
	PostPreviewBody,
	PostPreviewContent,
	PostPreviewHeader,
	PostPreviewImgPlaceholder,
	PostPreviewText,
	PostPreviewTime,
	PostPreviewTitle
} from '@features/PostPreview/ui/StyledPostPreview'
import { Dropdown } from '@shared/ui/Dropdown'
import { formatData } from '@shared/utils/formatData'
import React, { FC, memo } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'

interface IPostPreviewProps {
	post: IPost
}

export const PostPreview: FC<IPostPreviewProps> = memo(({ post }) => {
	const { showModal } = useModalContext()

	const handlePostOperation = (value: string) => {
		showModal(value, true, { post })
	}

	return (
		<PostPreviewContent>
			{/*<PostPreviewImg src={'#'} />*/}
			<PostPreviewImgPlaceholder />
			<PostPreviewBody>
				<PostPreviewHeader>
					<NavLink to={`/posts/${post.id}`}>
						<PostPreviewTitle>{post.title}</PostPreviewTitle>
					</NavLink>
					<Dropdown
						button={BiDotsVerticalRounded}
						onChangeCb={handlePostOperation}
						items={dropdownItems}
					/>
				</PostPreviewHeader>

				<PostPreviewText>{post.shortDescription}</PostPreviewText>
				<PostPreviewTime>{formatData(post.createdAt)}</PostPreviewTime>
			</PostPreviewBody>
		</PostPreviewContent>
	)
})
