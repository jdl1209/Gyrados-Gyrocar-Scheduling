// import { getSession } from '@auth0/nextjs-auth0';
// import { User } from '@auth0/nextjs-auth0/dist/auth0-session';

// export default async function ProfileServer() {
//   const session = await getSession();
//   const user: User | null = session?.user ?? null;

//   if (user) {
//     return (
//       <div>
//         <img src={user.picture || ''} alt={user.name || ''} />
//         <h2>{user.name || ''}</h2>
//         <p>{user.email || ''}</p>
//       </div>
//     );
//   } else {
//     // Handle case when user is not available
//     return <div>User not available</div>;
//   }
// }
