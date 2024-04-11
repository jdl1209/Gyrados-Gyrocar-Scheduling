// import type { Request, NextApiResponse } from 'next'
"use server";
import { DB } from "@/lib/db";

 
type ResponseData = {
  message: string
}

 
export async function GET(
  req: Request, 
  res: Response
) {
    const db = new DB();
    const result = await db.getAllCustomers();
    console.log(result);
    return Response.json(result)
}