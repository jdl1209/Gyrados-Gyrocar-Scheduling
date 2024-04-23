// // import type { Request, NextApiResponse } from 'next'

// import { DB } from "@/lib/db";

 
// type ResponseData = {
//   message: string
// }

 
// export async function POST(
//   req: Request, 
//   res: Response
// ) {
//     const data = await req.json();
//     const db = new DB();
//     const result = await db.insertLocation({
//         sublocationName: data.sublocationName,
//         address: data.address,
//         cityName: data.cityName,
//         zip: data.zip,

       
//     });
//     console.log(result);
//     return Response.json({  })
// }