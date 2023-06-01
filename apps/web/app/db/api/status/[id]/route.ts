// path to this snippet:
// app/db/api/[id]/status/route.ts
//route :"/db/api/status/:id"
import { NextResponse } from "next/server";
import {getContainerStatus} from "@flexidb/dockersol";
export async function GET(
            request: Request,
            {
            params,
            }: {
            params: { id: string };
            },
        ) {
            const id  = params.id;

            const status = await getContainerStatus(id);
            return NextResponse.json(status);
        }
