import { RefObject, useEffect } from 'react'

export const useCheckBottomSpacing = (
	element: RefObject<HTMLElement>,
	valueSetter: (value: string) => void,
	trigger: boolean,
	offset?: number
) => {
	useEffect(() => {
		const elementContent = element.current
		const elementHeight = elementContent?.scrollHeight
		if (elementContent && elementHeight) {
			const dropdownCords = elementContent?.getBoundingClientRect()
			if (dropdownCords.bottom > window.innerHeight) {
				valueSetter(
					`${dropdownCords.bottom - window.innerHeight + (offset ?? 0)}px`
				)
			}
		} else {
			valueSetter(`0px`)
		}
	}, [trigger])
}
