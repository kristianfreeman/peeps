import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

import { logger } from 'hono/logger'

import { createRoute } from 'honox/factory'

export default createRoute(
  logger(),
  async (c, next) => {
    const adapter = new PrismaD1(c.env.DB)
    const prisma = new PrismaClient({ adapter })
    c.set('prisma', prisma)
    await next()
  }
)
