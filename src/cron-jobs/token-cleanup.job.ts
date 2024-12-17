import cron from 'node-cron'
import TokenService from '../services/token.service'

cron.schedule('0 0 * * *', async () => {
  console.log('Running token cleanup...')
  await TokenService.clearExpiredTokens()
  console.log('Token cleanup completed.')
})
