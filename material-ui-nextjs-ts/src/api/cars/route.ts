// import type { Request, NextApiResponse } from 'next'

import { DB } from "@/lib/db";

 
type ResponseData = {
  message: string
}

 
export async function GET(
  req: Request, 
  res: Response
) {
    const db = new DB();
    const result = await db.getAllCars();
    console.log(result);
    return Response.json(result)
}