import { handlers } from '@app/tests/msw/handlers'
import { setupServer } from 'msw/node'

export const server = setupServer(...handlers)
