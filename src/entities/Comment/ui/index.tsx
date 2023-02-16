import { IComment, useUpdateCommentMutation } from '@entities/Comment'
import {
	CommentBody,
	CommentButtons,
	CommentContent,
	CommentImgPlaceholder,
	CommentInfo,
	CommentWrapper
} from '@entities/Comment/ui/StyledComment'
import { Button } from '@shared/ui/Button'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import { formatData } from '@shared/utils/formatData'
import { ChangeEvent, FC, useEffect, useState } from 'react'

export const Comment: FC<IComment> = ({
	commentatorInfo,
	id,
	createdAt,
	content
}) => {
	// Api calls
	const [updateComment] = useUpdateCommentMutation()

	// Vars
	const { userLogin, userId } = commentatorInfo

	// Local states
	const [editMode, setEditMode] = useState<boolean>(false)
	const [commentText, setCommentText] = useState<string>(content)

	// Handlers

	const changeCurrentComment = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setCommentText(value)
	}

	const cancelEditing = () => {
		setEditMode(false)
	}

	const submitEditing = async () => {
		await updateComment({ id, content: commentText })
		cancelEditing()
	}

	useEffect(() => {
		setCommentText(content)
	}, [content])

	return (
		<CommentWrapper>
			<CommentContent>
				<CommentImgPlaceholder />
				<CommentBody>
					<CommentInfo>
						<Typography variant={'sub-title-md'}>{userLogin}</Typography>
						<Typography variant={'sub-title-sm'}>
							{formatData(createdAt)}
						</Typography>
					</CommentInfo>
					<>
						{editMode ? (
							<p>{content}</p>
						) : (
							<TextField
								isTextarea
								value={commentText}
								onChange={changeCurrentComment}
							/>
						)}
					</>
				</CommentBody>
			</CommentContent>
			{editMode && (
				<CommentButtons>
					<Button variant={'secondary'} onClick={cancelEditing}>
						Cancel
					</Button>
					<Button variant={'primary'} onClick={submitEditing}>
						Edit comment
					</Button>
				</CommentButtons>
			)}
		</CommentWrapper>
	)
}
