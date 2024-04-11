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
    const result = await db.insertCar({
        carType: data.carType,
        battery: data.battery,
        status: data.status,
        reserved: data.reserved,
        currentLocationID: data.currentLocationID
    });
    console.log(result);
    return Response.json({  })
}