import { createRoute } from 'honox/factory'
import { Note, Url } from '@/generated/zod'

export default createRoute(async (c) => {
  const id = c.req.param('id')

  const person = await c.get('prisma').person.findUnique({
    include: {
      notes: true,
      urls: true
    },
    where: {
      id: Number(id)
    }
  })

  if (!person) {
    c.status(404)
    return c.render(
      <>
        <h1>Person not found</h1>
        <a href="/people">Back</a>
      </>
    )
  }

  return c.render(
    <>
      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h1>{person.name}</h1>
        <div>
          <a href={`/people/${id}/edit`}>Edit</a>
          <form method="post" action={`/contact`}>
            <input type="hidden" name="id" value={person.id} />
            <button type="submit">Contact</button>
          </form>
        </div>
      </header>

      <p>Last contacted {person.lastContacted?.toLocaleDateString()}</p>
      <p>{person.email}</p>
      <p>{person.phone}</p>
      <p>{person.birthday}</p>

      {person?.urls.length ? (
        <div>
          <h2>Urls</h2>
          <ul>
            {person.urls.map((url: Url) => (
              <li>
                <a href={url.url}>{url.description}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {person?.notes.length ? (
        <div>
          <h2>Notes</h2>

          <ul>
            {person.notes.map((note: Note) => (
              <li>{note.note}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
})