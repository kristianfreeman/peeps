import { createRoute } from 'honox/factory'
import { zValidator } from '@hono/zod-validator'
import { PersonCreateInputSchema } from '@/generated/zod'

export const POST = createRoute(zValidator('form', PersonCreateInputSchema), async (c) => {
  const data = c.req.valid('form')
  await c.get('prisma').person.create({ data })
  return c.redirect("/")
})