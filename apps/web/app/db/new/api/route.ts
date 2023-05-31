import {pullAndCreateContainer} from "@flexidb/dockersol"
import { NextApiRequest,NextApiResponse } from "next";
export async function POST (NextApiRequest,NextApiResponse){
    const {name,type,tag,envVariables,port}=NextApiRequest.body
    const containerId=await pullAndCreateContainer({name,dockerImage:type,tag, ENV:envVariables,PORT:port})
    return new Response(JSON.stringify({containerId}), {
        headers: {
            "content-type": "application/json",
        },
    });
}
