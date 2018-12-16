import Listen from './Listen';

if (!process.env.PREFIX)
  throw new Error('Exiting - Double check your environment variables.');
Listen();
