import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
  const body = await c.req.parseBody()
  const { id } = body
  const idNumber = Number(id)

  await c.get('prisma').person.update({
    where: { id: idNumber },
    data: { lastContacted: new Date(), },
  })

  return c.redirect(`/${id}`)
})