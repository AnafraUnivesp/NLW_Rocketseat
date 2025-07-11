import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333), // o coerce é um comando zod que converte o valor de uma string para número, pois o object.env é uma string
    DATABASE_URL: z.string().url().startsWith('postgresql://')
})

export const env = envSchema.parse(process.env) // exporto a constante env, o meu process.env será validado pelo schema
