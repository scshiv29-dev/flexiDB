"use client";
import { useParams } from "next/navigation"
import {getDB} from "@flexidb/config/dbconfig"
import {DbForm} from "@flexidb/ui"
export default async function NewDB(){
    const {id}=useParams()
    const db=await getdbinfo(id)
    
    return (
        <div>
            {JSON.stringify(db)}
        <DbForm name={id} tags={db.tags} env={db.ENV} port={db.PORT}/>

        </div>
    )
}
export async function getdbinfo(name:string){
    const db=await getDB(name)
    return db
}