import { useCreateCommentMutation } from '@entities/Post'
import { AddCommentFormWrapper } from '@features/AddCommentForm/ui/StyledAddCommentForm'
import { Button } from '@shared/ui/Button'
import { TextField } from '@shared/ui/Input'
import { ChangeEvent, useState } from 'react'

export const AddCommentForm = () => {
	// Api calls
	const [createComment, { isLoading }] = useCreateCommentMutation()

	// Local states
	const [commentContent, setCommentContent] = useState('')

	// Handlers
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
				disabled={isLoading}
				variant={'primary'}
				sx={{ marginTop: '1rem', alignSelf: 'flex-end' }}
			>
				Add comment
			</Button>
		</AddCommentFormWrapper>
	)
}
