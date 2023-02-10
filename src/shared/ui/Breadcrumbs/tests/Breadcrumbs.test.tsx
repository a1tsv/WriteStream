import { IBreadCrumbsItem } from '../model'
import { BreadCrumbs } from '../ui'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { screen } from '@testing-library/react'

describe('Breadcrumb', () => {
	const items: IBreadCrumbsItem[] = [
		{ title: 'Home', link: 'home' },
		{ title: 'About', link: 'about' },
		{ title: 'Contact', link: 'contact' }
	]

	it('renders breadcrumb items correctly', () => {
		renderWithRouter(<BreadCrumbs items={items} />, {})

		items.forEach(item => {
			expect(screen.getByText(item.title)).toBeInTheDocument()
		})
	})

	it('renders the first breadcrumb item without an arrow icon', () => {
		const items: IBreadCrumbsItem[] = [{ title: 'Home', link: 'home' }]
		renderWithRouter(<BreadCrumbs items={items} />, {})

		expect(
			screen.queryByLabelText('Pointer to the next item')
		).not.toBeInTheDocument()
	})

	it('renders the last breadcrumb item without a link', () => {
		renderWithRouter(<BreadCrumbs items={items} />, {})

		expect(screen.getByText('Contact')).not.toHaveAttribute('href')
	})

	it('renders a NavLink tag for breadcrumb items with a link', () => {
		renderWithRouter(<BreadCrumbs items={items} />, {})
		const firstItem = screen.getByText('Home')
		expect(firstItem.tagName).toBe('A')
	})

	it('renders the correct number of arrow icons', () => {
		renderWithRouter(<BreadCrumbs items={items} />, {})
		const arrowIcons = screen.getAllByLabelText('Pointer to the next item')
		expect(arrowIcons).toHaveLength(items.length - 1)
	})
})
