import { LoginForm } from '@features/LoginForm'
import { LoginFormWrapper, LoginImg } from '@pages/Login/ui/StyledLogin'
import GraphsSvg from '@public/img/rafiki.svg'

export const LoginPage = () => {
	return (
		<LoginFormWrapper>
			<LoginForm />
			<LoginImg>
				<img src={GraphsSvg} alt='' />
			</LoginImg>
		</LoginFormWrapper>
	)
}
