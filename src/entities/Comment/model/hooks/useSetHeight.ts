import { RefObject, useLayoutEffect, useState } from 'react'

export const useSetHeight = (
	editMode: boolean,
	textRef: RefObject<HTMLElement>,
	fieldRef: RefObject<HTMLElement>,
	offset: number
) => {
	const [textHeight, setTextHeight] = useState<number>(0)

	useLayoutEffect(() => {
		const textEl = textRef.current
		const fieldEl = fieldRef.current
		const scrollHeight = textEl?.scrollHeight
		setTextHeight(scrollHeight ?? 0)

		if (editMode && fieldEl) {
			fieldEl.style.height = `${textHeight + offset}px`
		}
	}, [editMode])
}
