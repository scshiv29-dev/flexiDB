"use client";
import { useParams } from "next/navigation"
import {getDB} from "@flexidb/config/dbconfig"
import {DbForm} from "@flexidb/ui"
export default async function NewDB(){
    const {id}=useParams()
const db=await getDB(id)
    
    return (
        <div>
            {JSON.stringify(db)}
        <DbForm name={id} tags={db.tags} env={db.ENV} port={db.PORT}/>

        </div>
    )
}
