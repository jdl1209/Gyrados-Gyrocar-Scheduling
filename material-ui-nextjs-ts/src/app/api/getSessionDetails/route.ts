// pages/api/getSessionDetails/route.ts
"use server";
import { getSession } from '@auth0/nextjs-auth0';

export default async function sessionHandler(req: any, res: any) {
    console.log("Executing sessionHandler"); // Add a log to check if the route is being executed

    try {
        const session = await getSession();
        const isSignedIn = !!session && !!session.user;
        res.status(200).json({ isSignedIn });
    } catch (error) {
        console.error("Error checking session:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
