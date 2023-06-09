"use client";
import { useParams } from "next/navigation"
import React from "react";
import { getDatabase } from "@flexidb/appwrite";
import {Logs} from "@flexidb/ui"
export default async function Page(){
    const {id}=useParams()
    const db = await getDatabase(id);
    

      return (
        <>
        <Logs containerId={db.containerId} />
        </>
        )}
