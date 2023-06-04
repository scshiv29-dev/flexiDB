"use client";
import { useParams } from "next/navigation"
import React,{useState,useEffect} from "react";
import { Manage } from "@flexidb/ui";
import {DBLIST} from "@flexidb/config/dbconfig"
export default async function Page(){
    const {id}=useParams()
    const [db,setDB]=useState<any>()

      return (
        <div className="text-white">
          <div>
     <Manage id={id} DBLIST={DBLIST} setServerDB={setDB}/>
         
          </div>
          
        </div>
      );
      
}
