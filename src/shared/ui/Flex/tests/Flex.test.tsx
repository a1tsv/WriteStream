import { Flex } from '@shared/ui/Flex'
import { render, screen } from '@testing-library/react'

describe('Flex block', () => {
	it('should renders correctly', () => {
		const flexContent = 'content'
		render(<Flex>{flexContent}</Flex>)

		expect(screen.getByText(flexContent)).toBeInTheDocument()
	})

	it('should apply styles', () => {
		const flexContent = 'content'
		render(
			<Flex
				justify={'center'}
				align={'center'}
				fDirection={'column'}
				sx={{ background: 'red' }}
			>
				{flexContent}
			</Flex>
		)

		expect(screen.getByText(flexContent)).toHaveStyle({
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			background: 'red'
		})
	})
})
