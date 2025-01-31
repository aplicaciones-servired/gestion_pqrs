import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string(),
  ORIGIN: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string()
})

const { success, data, error } = envSchema.safeParse(process.env)

if (!success) {
  console.error("Error en la configuración de las variables de entorno:", error.format());
  process.exit(1)
}

export const {
  PORT,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
} = data
