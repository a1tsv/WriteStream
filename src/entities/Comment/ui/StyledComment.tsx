import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

interface ICommentLikeButtonProps {
	selected: boolean
}

export const CommentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(15)};
	padding: ${rem(10)} ${rem(15)};

	border-bottom: 1px solid var(--color-main);
`

export const CommentContent = styled.div`
	display: flex;
	gap: ${rem(15)};
`

export const CommentImgPlaceholder = styled.div`
	flex: 0 0 40px;
	width: 40px;
	height: 40px;
	background: var(--color-main);
	border-radius: 50%;
`

export const CommentBody = styled.div`
	flex: 1 1 auto;
`

export const CommentLikes = styled.div`
	display: flex;
	gap: ${rem(10)};
`

export const CommentLikeButton = styled(Button).attrs({
	variant: 'second'
})<ICommentLikeButtonProps>`
	font-size: 20px;
	color: var(--color-main);
	display: flex;
	justify-content: center;
	align-items: center;
`

export const CommentLikeText = styled(Typography)`
	font-size: ${rem(14)};
	color: var(--color-main);
`
export const CommentHeader = styled.div`
	display: flex;
	gap: ${rem(10)};
	align-items: center;
	justify-content: space-between;
`

export const CommentInfo = styled.div`
	display: flex;
	gap: ${rem(10)};
	align-items: center;

	&:not(:last-child) {
		margin-bottom: ${rem(5)};
	}
`

export const CommentTextField = styled(TextField).attrs({
	isTextarea: true
})`
	width: 100%;
`

export const CommentButtons = styled.div`
	display: flex;
	gap: ${rem(10)};
`
