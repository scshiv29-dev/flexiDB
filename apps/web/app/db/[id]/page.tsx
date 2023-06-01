"use client";
import { useParams } from "next/navigation"
import { getDatabase } from "@flexidb/appwrite";
import React,{useState,useEffect} from "react";
export default async function NewDB(){
    const {id}=useParams()
    
    const [containerInfo, setContainerInfo] = useState<any>(undefined);
    const [db, setDb] = useState<any>(undefined);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/db/api/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(data);
            setDb(data.db);
            setContainerInfo(data.logs);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
      return (
        <div className="text-white">
          {db && JSON.stringify(db)}
          {containerInfo && JSON.stringify(containerInfo)}
        </div>
      );
      
}

