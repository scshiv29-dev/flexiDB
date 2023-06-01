// path to this snippet:
// app/db/api/[id]/status/route.ts
//route :"/db/api/:id/"
//test: "/db/api/dTACVilzPbBmhBhzDjPoV"

import { NextResponse } from "next/server";
import {getContainerInfo} from "@flexidb/dockersol";
import { getDatabase } from "@flexidb/appwrite";
export async function GET(
            request: Request,
            {
            params,
            }: {
            params: { id: string };
            },
        ) {
            const id  = params.id;

            const db = await getDatabase(id);
      
            const logs = await getContainerInfo(db.containerId);
            
            const response = {
                db,
                logs,
            };

            return NextResponse.json(response);
        }
