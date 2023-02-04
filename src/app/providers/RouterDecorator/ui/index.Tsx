import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator = (story: any) => {
	return <BrowserRouter>{story()}</BrowserRouter>
}
