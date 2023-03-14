import { useRateCommentMutation } from '../api'
import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IComment, useUpdateCommentMutation } from '@entities/Comment'
import {
	dropdownItems,
	TCommentRateStatuses,
	useSetHeight
} from '@entities/Comment/model'
import {
	CommentBody,
	CommentButtons,
	CommentContent,
	CommentHeader,
	CommentImgPlaceholder,
	CommentInfo,
	CommentLikeButton,
	CommentLikes,
	CommentLikeText,
	CommentTextField,
	CommentWrapper
} from '@entities/Comment/ui/StyledComment'
import { useAuthMeQuery } from '@entities/User'
import { Button } from '@shared/ui/Button'
import { Dropdown } from '@shared/ui/Dropdown'
import { Typography } from '@shared/ui/Typography'
import { formatData } from '@shared/utils/formatData'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TbHeartOff } from 'react-icons/tb'

export const Comment: FC<IComment> = ({
	id,
	createdAt,
	commentatorInfo,
	content,
	likesInfo
}) => {
	// Modals
	const { showModal } = useModalContext()

	// Api calls
	const [updateComment] = useUpdateCommentMutation()
	const [rateComment, { isLoading: ratingComment }] = useRateCommentMutation()

	const { data } = useAuthMeQuery()

	// Vars
	const { userId, userLogin } = commentatorInfo
	const { likesCount, dislikesCount, myStatus } = likesInfo
	const commentTextRef = useRef<HTMLParagraphElement>(null)
	const commentTextFieldRef = useRef<HTMLInputElement>(null)
	const isCurrentUserOwner = data?.userId === userId

	// Local states
	const [editMode, setEditMode] = useState<boolean>(false)
	const [commentText, setCommentText] = useState<string>(content)

	// Handlers
	const changeCurrentComment = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		e.target.style.height = 'inherit'
		e.target.style.height = `${e.target.scrollHeight}px`

		setCommentText(value)
	}

	const cancelEditing = () => {
		setEditMode(false)
		setCommentText(content)
	}

	const submitEditing = async () => {
		await updateComment({ id, content: commentText })
		cancelEditing()
	}

	const rateCommentHandler = (likeStatus: TCommentRateStatuses) => {
		console.log('in RATE COMMENT HANDLER', id, likeStatus)

		const currentRate = myStatus === likeStatus ? 'None' : likeStatus
		const ratePayload = { id, likeStatus: currentRate }
		rateComment(ratePayload)
	}

	const onDropdownChange = (value: ModalsEnum | string) => {
		if (Object.values(ModalsEnum).includes(value as ModalsEnum)) {
			showModal(value as ModalsEnum, true, { comment: { id } })
			return
		}
		setEditMode(true)
	}

	// Effects
	useSetHeight(editMode, commentTextRef, commentTextFieldRef, 10)

	return (
		<CommentWrapper>
			<CommentContent>
				<CommentImgPlaceholder />
				<CommentBody>
					<CommentHeader>
						<CommentInfo>
							<Typography variant={'sub-title-md'}>{userLogin}</Typography>
							<Typography variant={'sub-title-sm'}>
								{formatData(createdAt)}
							</Typography>
						</CommentInfo>
						{isCurrentUserOwner && (
							<Dropdown
								button={BiDotsVerticalRounded}
								onChangeCb={onDropdownChange}
								items={dropdownItems}
							/>
						)}
					</CommentHeader>
					<>
						{editMode ? (
							<CommentTextField
								isTextarea
								ref={commentTextFieldRef}
								value={commentText}
								onChange={changeCurrentComment}
							/>
						) : (
							<p ref={commentTextRef}>{content}</p>
						)}
					</>
					<CommentLikes>
						<CommentLikeButton
							variant={'secondary'}
							disabled={ratingComment}
							selected={myStatus === 'Like'}
							aria-label={'Like the comment'}
							onClick={() => rateCommentHandler('Like')}
						>
							<AiOutlineHeart />
							<CommentLikeText>{likesCount}</CommentLikeText>
						</CommentLikeButton>
						<CommentLikeButton
							variant={'secondary'}
							disabled={ratingComment}
							selected={myStatus === 'Dislike'}
							onClick={() => rateCommentHandler('Dislike')}
							aria-label={'Dislike the comment'}
						>
							<TbHeartOff />
							<CommentLikeText>{dislikesCount}</CommentLikeText>
						</CommentLikeButton>
					</CommentLikes>
				</CommentBody>
			</CommentContent>
			{editMode && (
				<CommentButtons>
					<Button variant={'secondary'} onClick={submitEditing}>
						Edit comment
					</Button>
					<Button variant={'primary'} onClick={cancelEditing}>
						Cancel
					</Button>
				</CommentButtons>
			)}
		</CommentWrapper>
	)
}
