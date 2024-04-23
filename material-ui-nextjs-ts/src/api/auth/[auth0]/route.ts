// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';


export const GET = handleAuth();

// import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default handleAuth({
//   async callback(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       await handleCallback(req, res);
//       // Redirect manually after successful authentication
//       res.writeHead(302, { Location: '../../dashboard/customer/account' });
//       res.end();
//     } catch (error) {
//       console.error(error);
//     //   res.status(error.status || 500).end(error.message);
//     }
//   },
// });
