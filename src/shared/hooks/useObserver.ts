import { RefObject, useEffect, useRef } from 'react'

export const useObserver = (
	ref: RefObject<HTMLElement>,
	callback: () => void,
	isLoading: boolean,
	canBeLoaded: boolean
) => {
	const observer = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		if (isLoading || !ref.current) return
		if (observer.current) observer.current.disconnect()
		const callWhenIntersect = ([entry]: IntersectionObserverEntry[]) => {
			if (entry.isIntersecting && canBeLoaded) {
				console.log(canBeLoaded, 'canBeLoaded')
				callback()
			}
		}
		observer.current = new IntersectionObserver(callWhenIntersect)
		observer.current.observe(ref.current)
	}, [isLoading, canBeLoaded])
}
