import { PrismaClient } from './generated/client'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables')
  }
  const adapter = new PrismaNeon({ connectionString }, {
    onPoolError: (err) => console.error('Neon pool error:', err),
    onConnectionError: (err) => console.error('Neon connection error:', err),
  })
  return new PrismaClient({ adapter: adapter as any })
}

const prisma = (globalThis as any).prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') (globalThis as any).prismaGlobal = prisma
