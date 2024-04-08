import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  return c.render(
    <div class="my-4">
      <h1 class="text-2xl font-bold mb-4">New person</h1>
      <form method="post" action="/people" class="space-y-4">
        <div>
          <label for="name">
            <span class="block mb-1">Name</span>
            <input type="text" name="name" required class="px-2 block w-full rounded dark:bg-slate-700" placeholder='e.g. "Alice" or "Bob"' />
          </label>
        </div>

        <div>
          <label for="email">
            <span class="block mb-1">Email</span>
            <input type="email" name="email" required class="px-2 block w-full rounded dark:bg-slate-700" placeholder='example@email.com' />
          </label>
        </div>

        <div>
          <label for="phone">
            <span class="block mb-1">Phone</span>
            <input type="tel" name="phone" required class="px-2 block w-full rounded dark:bg-slate-700" placeholder='+1 (234) 567-8901' />
          </label>
        </div>

        <div>
          <button
            class="transition-all bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Create</button>
        </div>
      </form>
    </div>
  )
})