import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  return c.render(
    <>
      <h1>New connection</h1>
      <form method="post" action="/people">
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>

        <div>
          <label>
            Email
            <input type="email" name="email" />
          </label>
        </div>

        <div>
          <label>
            Phone
            <input type="tel" name="phone" />
          </label>
        </div>

        <div>
          <label>
            Birthday
            <input type="date" name="birthday" />
          </label>
        </div>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  )
})