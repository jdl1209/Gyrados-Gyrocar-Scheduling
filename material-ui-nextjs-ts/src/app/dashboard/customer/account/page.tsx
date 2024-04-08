import { Metadata } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { DB } from '@/lib/db';
import { Button, Box, Container, Paper } from '@mui/material';
import { Typography } from '@mui/material';



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
    return <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6">Invalid session</Typography>
    </Box>;
  }

  console.log(session.user.sub);

  const user = session.user;
  const userRoles: string[] = session.user.roles || [];

  console.log('User roles:', userRoles); // Log user roles to console
  console.log('Session:', session);

  const db = new DB();
  const datad: any[] = await db.getCustomerByID(session.user.sub) as any[];

  // const data: any[] = await db.getAllLocations() as any[];
  // const data2: any[] = await db.getAllCustomers() as any[];
  // const data3: any[] = await db.getAllEmployees() as any[];
  // const data4: any[] = await db.getAllCars() as any[];
  // const data5: any[] = await db.getAllFAQ() as any[];


  return (
    <>
      <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Welcome, {user.name}
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">ID: {user.sub}</Typography>
          <Typography variant="body1">Role: {user?.app_metadata?.authorization?.roles}</Typography>
          {/* Display additional user info or roles here if needed */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            href='/api/auth/logout'
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
      <div>
        {datad.map((item: any, idx: number) => (
          <div key={idx}>
            <p>Name: {item.username}</p>
            <p>Name: {item.zip}</p>
            <p>Name: {item.email}</p>

            {/* <p>Phone: {item.phoneNum}</p>
            <p>Login ID: {item.loginId}</p>
            <p>Username: {item.username}</p>
            <p>Email: {item.email}</p>
            <p>Address: {item.address1}</p>
            {item.address2 && <p>Address Line 2: {item.address2}</p>}
            <p>City: {item.city}</p>
            <p>State: {item.state}</p>
            <p>Zip: {item.zip}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}, { returnTo: '/dashboard/customer/account' });
