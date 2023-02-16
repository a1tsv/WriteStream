import { Comment, IComment } from '@entities/Comment'
import { Typography } from '@shared/ui/Typography'
import { CommentsItems } from '@widgets/Comments/ui/StyledComments'
import { FC } from 'react'

interface ICommentsProps {
	items: IComment[]
}

export const Comments: FC<ICommentsProps> = ({ items }) => {
	return (
		<div>
			<Typography variant={'title'}>Comments({items.length})</Typography>
			<CommentsItems>
				{items.map(item => (
					<Comment key={item.id} {...item} />
				))}
			</CommentsItems>
		</div>
	)
}
