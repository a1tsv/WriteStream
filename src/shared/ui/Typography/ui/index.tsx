import { SxComponent } from '@shared/types'
import styled, { css } from 'styled-components'

interface ITypographyProps {
	variant: 'title' | 'sub-title-md' | 'sub-title-sm'
	align: string
}

export const Typography = styled.p<SxComponent<Partial<ITypographyProps>>>`
	color: var(--color-primary);
	text-align: ${({ align }) => align || 'left'};
	${p =>
		p.variant === 'title' &&
		css`
			font-weight: var(--fw-bold);
			font-size: var(--fs-big);
		`};
	${p =>
		p.variant === 'sub-title-md' &&
		css`
			font-weight: var(--fw-bold);
			font-size: var(--fs-md);
		`};
	${p =>
		p.variant === 'sub-title-sm' &&
		css`
			font-weight: var(--fw-sm);
			font-size: var(--fs-sm);
		`};
	${p => ({ ...p.sx })}
`
