// Import necessary modules
import { DB } from "@/lib/db";
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Typography } from "@mui/material";
import DashboardLayout from "./layout";

// `app/page.tsx` is the UI for the `/` URL
// Wrap the component with `withPageAuthRequired` to require authentication
const DashboardPage = async () => {
  const session = await getSession();
  
  if (!session || !session.user) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Invalid session</Typography>
      </Box>
    );
  }

  console.log(session.user.sub);

  const user = session.user;
  const userRoles: string[] = session.user.roles || [];

  console.log('User roles:', userRoles);
  console.log('Session:', session);

  const db = new DB();
  
  try {
    // Await the resolution of the Promise returned by db.getUserRole
    const role = await db.getUserRole(session.user.sub);

    // Check if the role is of type string array
    if (Array.isArray(role)) {
      console.log("This is my user role " + role);
      return (
        <div>
          {/* Pass the user's role to the layout component */}
          <DashboardLayout role={role} children={undefined} />
        </div>
      );
    } else {
      console.error("User role is not of type string array");
      return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Error fetching user role</Typography>
        </Box>
      );
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Error fetching user role</Typography>
      </Box>
    );
  }
}

export default withPageAuthRequired(DashboardPage);


