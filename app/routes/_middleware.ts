import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

import { logger } from 'hono/logger'
import { methodOverride } from 'hono/method-override'

import { createRoute } from 'honox/factory'

// import { Hono } from 'hono'
// const app = new Hono()

import app from "../server"

export default createRoute(
  logger(),
  methodOverride({ app }),
  async (c, next) => {
    const adapter = new PrismaD1(c.env.DB)
    const prisma = new PrismaClient({ adapter })
    c.set('prisma', prisma)
    await next()
  }
)
