export type SXType = {
	sx?: {
		[key: string]: string
	}
}

export type SxComponent<D> = SXType & D
