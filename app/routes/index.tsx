import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const people = await c.get('prisma').person.findMany()

  return c.render(
    <>
      <header class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold mb-4">
          Tracking {people.length} {people.length === 1 ? 'person' : 'people'}
        </h1>

        <a
          class="transition-all bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          href="/people/new"
        >+ Add Person</a>
      </header>

      <div class="space-y-4">
        <h2 class="text-xl font-bold mb-2">People</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((person) => (
            <a
              class="transition-all rounded p-4 dark:bg-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:shadow-outline"
              href={`/people/${person.id}`}
              key={person.id}
            >
              <div>
                <span class="font-bold">
                  {person.name}
                </span>

                <p>{person.lastContacted ? `Last contacted ${person.lastContacted.toDateString()}` : 'Not yet contacted'}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>,
  )
})