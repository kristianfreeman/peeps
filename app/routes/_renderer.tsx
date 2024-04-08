import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? "${title} | Peeps" : "Peeps"}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"></link>
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body>
        <nav>
          <a href="/">Peeps</a>
        </nav>
        {children}
        <script src="http://instantclick.io/v3.1.0/instantclick.min.js" data-no-instant></script>
        <script data-no-instant>InstantClick.init();</script>
      </body>
    </html>
  )
})
