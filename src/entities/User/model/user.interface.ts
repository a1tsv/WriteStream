export interface IUser {
	id: string
	login: string
	email: string
	createdAt: string
}

export interface ILoginFields {
	loginOrEmail: string
	password: string
}

export interface IRegisterFields {
	login: string
	email: string
	password: string
}

export interface ITokenResponse {
	accessToken: string
}

export interface IAddUserFields {
	login: string
	email: string
	password: string
}

export type IAuthMeResponse = Omit<IAddUserFields, 'password'> & {
	userId: string
}
