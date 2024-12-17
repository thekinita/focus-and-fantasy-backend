import cron from 'node-cron'
import TokenService from '../services/token.service'

const tokenService = new TokenService()

cron.schedule('0 0 * * *', async () => {
  console.log('Running token cleanup...')
  await tokenService.clearExpiredTokens()
  console.log('Token cleanup completed.')
})
