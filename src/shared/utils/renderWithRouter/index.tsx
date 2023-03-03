// import { render, RenderOptions } from '@testing-library/react'
// import { ReactElement } from 'react'
// import { MemoryRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

type RenderWithRouterProps = {
	route?: string
}

// export const renderWithRouter = (
// 	ui: ReactElement,
// 	{
// 		route = '/',
// 		...renderOptions
// 	}: RenderWithRouterProps & Omit<RenderOptions, 'queries'>
// ) => {
// 	// window.history.pushState({}, 'Test page', route)
// 	window.location.pathname = route
// 	return render(ui, { wrapper: MemoryRouter, ...renderOptions })
// }

export const renderWithRouter = (
	ui: ReactElement,
	{ route = '/' }: RenderWithRouterProps & Omit<RenderOptions, 'queries'>
) => {
	window.history.pushState({}, 'Test page', route)

	return {
		...render(ui, { wrapper: BrowserRouter })
	}
}
