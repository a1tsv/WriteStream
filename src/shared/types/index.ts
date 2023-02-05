export type SXType = {
	[key: string]: string
}

export type SxComponent<D> = { sx?: SXType } & D
