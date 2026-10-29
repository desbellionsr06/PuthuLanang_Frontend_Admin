// Route handler Auth.js: /api/auth/* (signin, callback/google, signout, session, csrf)
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
