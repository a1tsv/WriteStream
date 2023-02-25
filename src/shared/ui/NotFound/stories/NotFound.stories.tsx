import { RouterDecorator } from '@app/providers/RouterDecorator'
import { NotFound } from '@shared/ui/NotFound'
import { ComponentMeta } from '@storybook/react'

export default {
	title: 'Shared/NotFound',
	decorators: [RouterDecorator],
	component: NotFound
} as ComponentMeta<typeof NotFound>

export const Default = () => <NotFound label='Not found 😔' />
export const WithFallback = () => (
	<NotFound label='There is nothing here yet' fallback='/blogs' />
)
