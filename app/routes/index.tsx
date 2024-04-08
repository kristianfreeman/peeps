import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const people = await c.get('prisma').person.findMany()

  return c.render(
    <>
      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h1>Tracking {people.length} people</h1>
        <a href="/people/new">New person</a>
      </header>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last contacted</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr>
              <td>
                <a href={`/people/${person.id}`}>{person.name}</a>
              </td>
              <td>
                {person.lastContacted && new Date(person.lastContacted).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>,
  )
})