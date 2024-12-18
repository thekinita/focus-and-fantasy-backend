import * as dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,

  //JWT
  SECRET_KEY: process.env.SECRET_KEY || '',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || '',

  // SMTP settings
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || undefined,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || undefined
}
