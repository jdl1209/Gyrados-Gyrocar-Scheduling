import { DB } from "@/lib/db";

export async function POST(
    req: Request,
    res: Response
    ) {

        const data = await req.json();
        const db = new DB();

        console.log(data);


        console.log(data.reportType,
            data.carID,
            data.locationID,
            data.reportStatus,
            data.timeSpentLabor,
            data.tasks,
            data.notes);

        const result = await db.insertMechanicReport({
            reportType: data.reportType,
            carID: data.carID,
            locationID: data.locationID,
            reportStatus: data.reportStatus,
            timeSpentLabor: data.timeSpentLabor,
            tasks: data.tasks,
            notes: data.notes
        });
        //console.log(result);
        // return res.json({ message: 'Report created successfully' });
        return Response.json("Hello");
}
