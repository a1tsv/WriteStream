import { prepareRoutes } from "."

describe('prepareRoutes', () => {
  it('should return routes for current user when user is authenticated', () => {
    const isAuth = true
    const result = prepareRoutes(isAuth)
    result.every((route) => {
      expect(route).toHaveProperty('isPrivate')
    })
  })

  it('should return routes for current user when user is not authenticated', () => {
    const isAuth = false
    const result = prepareRoutes(isAuth)
    result.every((route) => {
      expect(route).not.toHaveProperty('isPrivate')
    })
  })
})