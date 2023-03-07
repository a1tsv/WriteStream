import { RegisterImg } from './StyledRegister'
import { RegisterForm } from '@features/RegisterForm'
import GraphsSvg from '@public/img/rafiki.svg'
import { FormWithImage } from '@shared/ui/FormLayout/ui'

export const Register = () => {
	return (
		<FormWithImage>
			<RegisterForm />
			<RegisterImg>
				<img src={GraphsSvg} alt='' />
			</RegisterImg>
		</FormWithImage>
	)
}
