import { createRoute } from 'honox/factory'

export const POST = createRoute(async (c) => {
  const body = await c.req.parseBody()
  const { name, email, phone } = body

  await c.get('prisma').person.create({
    data: {
      name,
      email,
      phone,
    },
  })

  return c.redirect("/")
})