import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

type RenderWithRouterProps = {
	route?: string
	history?: any
}

export const renderWithRouter = (
	ui: ReactElement,
	{
		route = '/',
		history = [],
		...renderOptions
	}: RenderWithRouterProps & Omit<RenderOptions, 'queries'>
) => {
	window.history.pushState({}, 'Test page', route)
	return render(ui, { wrapper: MemoryRouter, ...renderOptions })
}
