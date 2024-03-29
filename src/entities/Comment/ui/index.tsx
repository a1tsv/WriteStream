import { useRateCommentMutation } from '../api'
import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IComment, useUpdateCommentMutation } from '@entities/Comment'
import { dropdownItems, useSetHeight } from '@entities/Comment/model'
import {
	CommentBody,
	CommentButtons,
	CommentContent,
	CommentHeader,
	CommentImgPlaceholder,
	CommentInfo,
	CommentTextField,
	CommentWrapper
} from '@entities/Comment/ui/StyledComment'
import { useAuthMeQuery } from '@entities/User'
import { TRateStatuses } from '@shared/api/api.interface'
import { Button } from '@shared/ui/Button'
import { Dropdown } from '@shared/ui/Dropdown'
import { Typography } from '@shared/ui/Typography'
import { formatData } from '@shared/utils/formatData'
import { Rates } from '@widgets/Rates'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

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

	const rateCommentHandler = (likeStatus: TRateStatuses) => {
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
					<Rates
						isLoading={ratingComment}
						myStatus={myStatus}
						likesCount={likesCount}
						dislikesCount={dislikesCount}
						handleRate={rateCommentHandler}
					/>
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
