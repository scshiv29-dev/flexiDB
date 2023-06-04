import {pullAndCreateContainer} from "@flexidb/dockersol"
import { NextRequest,NextResponse } from "next/server";

export async function POST (request:Request){
    const {name,type,tag,envVariables,port}=await request.json()
    
    const containerId=await pullAndCreateContainer({name,dockerImage:type,tag, ENV:envVariables,PORT:port})
    return new Response(JSON.stringify(containerId), {
        headers: {
            "content-type": "application/json",
        },
    });
}
