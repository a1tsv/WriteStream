import { useEffect, useState } from 'react'

export const ThemeDecorator = (Story: any) => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		document.body.dataset.theme = theme
	}, [theme])

	const switchTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<>
			<button
				onClick={switchTheme}
				style={{
					cursor: 'pointer',
					padding: '0.2rem 0.5rem',
					border: '1px solid var(--color-primary)',
					color: 'var(--color-primary)',
					borderRadius: '0.2rem'
				}}
			>
				Switch theme
			</button>
			<Story />
		</>
	)
}
