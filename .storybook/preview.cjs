import { ThemeDecorator } from '@app/providers/ThemeDecorator'
import '@app/styles/index.scss'
import { initialize, mswDecorator } from 'msw-storybook-addon'

initialize()

export const decorators = [mswDecorator, ThemeDecorator]
export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
}
