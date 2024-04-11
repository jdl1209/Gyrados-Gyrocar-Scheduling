//this is needed because some mui functions expecet "client" things like being able to use hooks. In this case we need it for the theming
import SubmitApplication from "@/components/Dashboard Components/customer/SubmitApplication";
import { getSession } from "@auth0/nextjs-auth0";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default async function Apply() {
  const session = await getSession();
  
  if (!session || !session.user) {
    return <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6">Invalid session</Typography>
    </Box>;
  }

  const userID = session.user.sub;

  console.log(session.user.sub);


  return (
    <>
      <SubmitApplication userID={userID}/>
    </>
  );
};

// async function registerUser() {
//   const res = await fetch('http://localhost:3000/api/register');
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error(`Failed to fetch data ${res.statusText}`);
//   }
 
//   return res.json()
// }

