import { Comment, IComment } from '@entities/Comment'
import { useAuthMeQuery } from '@entities/User/api/user.api'
import { AddCommentForm } from '@features/AddCommentForm'
import { Typography } from '@shared/ui/Typography'
import { CommentsItems } from '@widgets/Comments/ui/StyledComments'
import { FC } from 'react'

interface ICommentsProps {
	items: IComment[]
}

export const Comments: FC<ICommentsProps> = ({ items }) => {
	const { isSuccess: isAuth, data } = useAuthMeQuery()

	return (
		<div>
			<Typography variant={'title'} sx={{ marginBottom: '0.6rem' }}>
				Comments({items.length})
			</Typography>
			{isAuth && <AddCommentForm />}
			<CommentsItems>
				{items.map(item => (
					<Comment key={item.id} {...item} />
				))}
			</CommentsItems>
		</div>
	)
}
