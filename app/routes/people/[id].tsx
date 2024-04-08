import { createRoute } from 'honox/factory'
import { Note, PersonUpdateInputSchema, Url } from '@/generated/zod'

import { Hono } from 'hono'
import { methodOverride } from 'hono/method-override'
import { zValidator } from '@hono/zod-validator'
const app = new Hono()

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
        <a href="/">Back</a>
      </>
    )
  }

  return c.render(
    <>
      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h1 class="text-2xl font-bold mb-4">
          {person.name}
        </h1>
        <div class="flex space-x-4">
          <a
            class="transition-all bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href={`/people/${id}/edit`}
          >Edit</a>

          <form action={`/people/${id}/delete`} method="POST">
            <input type="hidden" name="id" value={person.id} />
            <button
              class="transition-all bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Delete user</button>
          </form>

          <form method="POST" action={`/people/${id}/contact`}>
            <button
              class="transition-all bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Contacted</button>
          </form>
        </div>
      </header>

      <div class="space-y-4">
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

        {/* form to add new note */}
        <form method="post" action={`/people/${id}/notes`} class="space-y-4">
          <div>
            <label for="note">
              <span class="block mb-1">Note</span>
              <textarea name="note" required class="px-2 block w-full rounded dark:bg-slate-700" placeholder='e.g. "Alice is a great person"' />
            </label>
          </div>

          <div>
            <button
              class="transition-all bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  )
})

export const POST = createRoute(
  zValidator('form', PersonUpdateInputSchema),
  async (c) => {
    const id = c.req.param('id')
    const data = c.req.valid('form')

    await c.get('prisma').person.update({
      data,
      where: { id: Number(id) }
    })

    return c.redirect(`/people/${id}`)
  })
