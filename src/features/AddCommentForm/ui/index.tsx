import { useCreateCommentMutation } from '@entities/Post'
import { AddCommentFormWrapper } from '@features/AddCommentForm/ui/StyledAddCommentForm'
import { Button } from '@shared/ui/Button'
import { TextField } from '@shared/ui/Input'
import { ChangeEvent, useState, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'

export const AddCommentForm = () => {
	// Vars
	const { id } = useParams()
	console.log('CURRENT ID IS', id)

	// Api calls
	const [createComment, { isLoading: creatingComment }] =
		useCreateCommentMutation()

	// Local states
	const [commentContent, setCommentContent] = useState('')
	const commentIsShort = commentContent.length < 20

	// Handlers
	const handleCreateComment = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		if (id && commentContent) {
			await createComment({ id, content: commentContent })
			setCommentContent('')
		}
	}

	const handleCommentContentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentContent(e.target.value)
	}

	return (
		<AddCommentFormWrapper>
			<TextField
				value={commentContent}
				onChange={handleCommentContentChange}
				isTextarea
				placeholder={'Add a comment...'}
				sx={{ minHeight: '100px' }}
			/>
			<Button
				onClick={handleCreateComment}
				disabled={creatingComment || commentIsShort}
				variant={'primary'}
				sx={{ marginTop: '1rem', alignSelf: 'flex-end' }}
			>
				Add comment
			</Button>
		</AddCommentFormWrapper>
	)
}
