import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const id = c.req.param('id')

  const person = await c.get('prisma').person.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!person) {
    c.status(404)
    return c.render(
      <>
        <h1>Person not found</h1>
        <a href="/">Back</a>
      </>
    )
  }

  return c.render(
    <>
      <h1>Update {person.name} Details</h1>

      <a href={`/people/${id}`}>Back</a>

      <form method="post" action={`/people/${id}`}>
        <div>
          <label>
            Name
            <input type="text" name="name" required value={person.name} />
          </label>
        </div>

        <div>
          <label>
            Email
            <input type="email" name="email" value={person.email ?? ""} />
          </label>
        </div>

        <div>
          <label>
            Phone
            <input type="tel" name="phone" value={person.phone ?? ""} />
          </label>
        </div>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  )
})