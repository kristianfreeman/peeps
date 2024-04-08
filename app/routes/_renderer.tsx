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
        <script src="https://cdn.tailwindcss.com"></script>
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body class="bg-white dark:bg-slate-800 dark:text-white container mx-auto">
        <nav class="py-2 mb-4">
          <a class="font-bold" href="/">Peeps »</a>
        </nav>
        <div>
          {children}
        </div>
        <script src="http://instantclick.io/v3.1.0/instantclick.min.js" data-no-instant></script>
        <script data-no-instant>InstantClick.init();</script>
      </body>
    </html>
  )
})
