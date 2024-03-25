import { Metadata } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { DB } from '@/lib/db';



// Define your roles and their corresponding privileges
const roles = {
  ADMIN: 'admin',
  USER: 'user',
  // Add more roles as needed
};

// set page metadata
export const metadata: Metadata = {
  title: 'My Account',
}

export default withPageAuthRequired(async function AccountDashboard() {
  const session = await getSession();
  
  if (!session || !session.user) {
    return <div>Invalid session</div>;
  }

  console.log(session.user.sub);

  const user = session.user;
  const userRoles: string[] = session.user.roles || [];

  console.log('User roles:', userRoles); // Log user roles to console
  console.log('Session:', session);

  const db = new DB();
  // const datad: any[] = await db.getCustomerByID(session.user.sub) as any[];
  // const data: any[] = await db.getAllLocations() as any[];
  // const data2: any[] = await db.getAllCustomers() as any[];
  // const data3: any[] = await db.getAllEmployees() as any[];
  // const data4: any[] = await db.getAllCars() as any[];
  // const data5: any[] = await db.getAllFAQ() as any[];

  return (
    <>
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <p>ID: {user.sub}</p>
        <p>Role: {user?.app_metadata?.authorization?.roles}</p> {/* Display user's roles */}
      </div>
      <h1>LocationIDs</h1>
      {/* <div>
        {datad.map((item: any, idx: number) => (
          <div key={idx}>
            <p>Name: {item.fName} {item.mInitial} {item.lName} {item.suffix}</p>
            <p>Phone: {item.phoneNum}</p>
            <p>Login ID: {item.loginId}</p>
            <p>Username: {item.username}</p>
            <p>Email: {item.email}</p>
            <p>Address: {item.address1}</p>
            {item.address2 && <p>Address Line 2: {item.address2}</p>}
            <p>City: {item.city}</p>
            <p>State: {item.state}</p>
            <p>Zip: {item.zip}</p>
          </div>
        ))}
      </div> */}
    </>
  );
}, { returnTo: '/dashboard/customer/account' });
