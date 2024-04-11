// Import necessary modules
import { Request, Response } from 'express'; // Assuming you're using Express
import { DB } from "@/lib/db";

export async function POST(
  req: Request, 
  res: Response
) {
  try {
    const data = req.body; // Assuming the data is sent in the request body
    const db = new DB();
    
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
      zip: data.licenseNumber,
      email: data.email,
      suffix: "", // Currently empty. You may need to adjust this.
      userID: data.userID,
      roleID: 0, // Assuming the role ID is 0. Adjust as needed.
      activated: null, // Currently null. You may need to adjust this.
      office: null, // Currently null. You may need to adjust this.
    });
    
    console.log(result);
    
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
}
