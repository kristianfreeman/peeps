import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import z from 'zod'

const idSchema = z.object({
  id: z.string(),
})

export const POST = createRoute(zValidator('form', idSchema), async (c) => {
  const { id } = await c.req.valid('form')
  const idNumber = Number(id)

  await c.get('prisma').person.delete({
    where: { id: idNumber }
  })

  return c.redirect(`/`)
})