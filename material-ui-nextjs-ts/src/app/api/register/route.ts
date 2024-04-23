// Import necessary modules
import { Request, Response } from 'express'; // Ensure you import Request and Response from the correct location
import { DB } from "@/lib/db";

export async function POST(
  req: Request, 
  res: Response
) {

        const data = req.body; // Use req.body to access the parsed JSON object sent in the request body
        const db = new DB();

        console.log(data);
        
        const result = await db.insertCustomerInfo({
          fName: data.name.split(' ')[0],
          mInitial: "", // Currently empty. You may need to adjust this.
          lName: data.name.split(' ')[1],
          username: data.name,
          address1: data.address1,
          address2: data.address2,
          phoneNum: data.phone,
          city: data.city,
          state: data.state,
          zip: data.licenseNumber, // Use data.licenseNumber instead of data.zip if licenseNumber is available
          email: data.email,
          suffix: "", // Currently empty. You may need to adjust this.
          userID: data.userID,
          roleID: 0, // Assuming the role ID is 0. Adjust as needed.
          activated: null, // Currently null. You may need to adjust this.
          office: null, // Currently null. You may need to adjust this.
        });
        
        console.log(result);
        
        res.json(result); // Use res.json(result) to send the response back to the client
        return Response.json(result);
}
