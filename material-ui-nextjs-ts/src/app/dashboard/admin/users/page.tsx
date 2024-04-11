import GetAllUsers from "@/components/AdminControls/getAllUsers";
import React, { useState, useEffect } from "react";




export default async function Users(){
  const data = await getAllUsers();

  return(
    <>
      <GetAllUsers data={data}/>
    </>
   
  );

}



async function getAllUsers() {
  const res = await fetch('http://localhost:3000/api/customers');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data ${res.statusText}`);
  }
 
  return res.json()
}