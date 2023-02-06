import { MemoryRouter } from 'react-router'

export const RouterDecorator = (story: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return <MemoryRouter initialEntries={['']}>{story()}</MemoryRouter>
}
