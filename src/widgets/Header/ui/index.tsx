import {
	HeaderBurgerButton,
	HeaderContainer,
	HeaderThemeSwitcher,
	HeaderWrapper
} from './StyledHeader'
import {
	getItemFromLC,
	setItemToLC
} from '@shared/utils/localStorage/localStorage'
import { FC, useEffect, useState } from 'react'
import { BiSun } from 'react-icons/bi'
import { BsFillMoonFill } from 'react-icons/bs'
import { RxRows } from 'react-icons/rx'

interface IHeaderProps {
	sideBarStateChanger: () => void
}

export const Header: FC<IHeaderProps> = ({ sideBarStateChanger }) => {
	const savedThemeInLC = getItemFromLC('theme') as string
	const [theme, setTheme] = useState(savedThemeInLC || 'light')
	const isLight = theme === 'light'

	const changeTheme = () => {
		const newTheme = isLight ? 'dark' : 'light'
		setItemToLC('theme', newTheme)
		setTheme(newTheme)
	}

	useEffect(() => {
		document.documentElement.dataset.theme = theme
	}, [theme])

	return (
		<HeaderWrapper>
			<HeaderContainer>
				<HeaderBurgerButton
					onClick={sideBarStateChanger}
					aria-label={'Burger menu'}
				>
					<RxRows />
				</HeaderBurgerButton>
				<HeaderThemeSwitcher
					onClick={changeTheme}
					aria-label={'Theme switcher'}
				>
					{isLight ? <BiSun /> : <BsFillMoonFill />}
					<p className={'hidden'}>{isLight ? 'Light' : 'Dark'}</p>
				</HeaderThemeSwitcher>
			</HeaderContainer>
		</HeaderWrapper>
	)
}
