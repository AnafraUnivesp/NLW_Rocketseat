import postgres from 'postgres'
import { env } from '../env.ts'

export const sql = postgres(env.DATABASE_URL) //chamei o client de sql

const result = await sql`SELECT "Hello" as mensage`

console.log(result)
