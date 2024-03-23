// import type { Request, NextApiResponse } from 'next'
"use server";
import { DB } from "@/lib/db";

 
type ResponseData = {
  message: string
}

 
export async function POST(
  req: Request, 
  res: Response
) {
    const data = await req.json();
    const db = new DB();
    const result = await db.insertCustomer({
        fName: data.name.split(' ')[0],
        mInitial: "d",
        lName: data.name.split(' ')[1],
        username: data.name,
        address1: data.address1,
        address2: data.address2,
        phoneNum: data.phone,
        city: data.city,
        state: data.state,
        zip: data.licenseNumber,
        email: data.email,
        suffix: "sdv",
        loginId: data.user.sub
    });
    console.log(result);
    return Response.json({  })
}