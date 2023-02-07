import { PostPreview } from '@features/PostPreview'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { screen } from '@testing-library/react'

describe('PostPreview', () => {
	const post = {
		id: '1',
		title: 'Title',
		shortDescription: 'Short description',
		content: 'Content',
		blogId: '1',
		blogName: 'Blog name',
		createdAt: '2021-01-01'
	}

	it('should render correctly', () => {
		renderWithRouter(<PostPreview post={post} />, {})
		expect(screen.getByText('Title')).toBeInTheDocument()
	})
})
