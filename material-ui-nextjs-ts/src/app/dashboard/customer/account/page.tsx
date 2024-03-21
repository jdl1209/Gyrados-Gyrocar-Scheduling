import { Metadata } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { DB } from '@/lib/db';
import CreateEmployee from '../../../components/AdminControls/createEmployee';
import CreateCar from '../../../components/AdminControls/createCar';
import CreateLocation from '@/components/AdminControls/createLocation';


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

  const user = session.user;
  const userRoles: string[] = session.user.roles || [];

  console.log('User roles:', userRoles); // Log user roles to console
  console.log('Session:', session);

  const db = new DB();
  const data: any[] = await db.getAllLocations() as any[];
  const data2: any[] = await db.getAllCustomers() as any[];
  const data3: any[] = await db.getAllEmployees() as any[];
  const data4: any[] = await db.getAllCars() as any[];
  const data5: any[] = await db.getAllFAQ() as any[];



  
  return (
    <>
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <p>ID: {user.sub}</p>
        <p>Role: {user?.app_metadata?.authorization?.roles}</p> {/* Display user's roles */}
      </div>
      <h1>LocationIDs</h1>






     
    </>
  );
}, { returnTo: '/dashboard/account' });
