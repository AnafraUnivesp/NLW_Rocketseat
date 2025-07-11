import { fastifyCors } from '@fastify/cors'
import {} from './db/'
import { fastify } from 'fastify'
import import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from 'process'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173',  // ou user * para permitir que qq endereço acesse
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return 'OK'
})

app.listen({ port: env.PORT })


