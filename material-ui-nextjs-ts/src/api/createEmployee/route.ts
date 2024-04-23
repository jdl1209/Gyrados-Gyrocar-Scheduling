// import type { Request, NextApiResponse } from 'next'

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
    const result = await db.insertEmployee({
        username: data.username,
        // fullname: data.fullname,
        office: data.office,
        roleID: data.roleID,
        userID: "",
        fName: "",
        mInitial: null,
        lName: "",
        suffix: null,
        phoneNum: null,
        email: "",
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        activated: null
    });
    console.log(result);
    return Response.json({  })
}