import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
  const id = c.req.param('id')
  const idNumber = Number(id)

  await c.get('prisma').person.update({
    where: { id: idNumber },
    data: { lastContacted: new Date(), },
  })

  return c.redirect(`/people/${id}`)
})