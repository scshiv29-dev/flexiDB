
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
