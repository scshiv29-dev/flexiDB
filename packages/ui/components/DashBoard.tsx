"use client";
import React, { useState, useEffect } from "react";
import DBstat from "./DBstat";
import { getDatabases } from "@flexidb/appwrite";
import { Plus } from "lucide-react";

export default function DashBoard() {
  const [dblist, setDblist] = useState<any>();
  console.log(process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  useEffect(() => {
    getDatabases(process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID).then((res) => setDblist(res.documents));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-white-100 mb-4">
        Welcome to FlexiDB! This is a dashboard to manage your databases.
      </p>
      <div className="flex justify-end mb-5">
        <div className="badge badge-success hover:badge-info rounded-full">
          <Plus
            size={30}
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/db";
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center space-x-4 space-y-4">
        {dblist?.map((db: any) => (
          <DBstat
            key={db.$id}
            name={db.name}
            type={db.type}
            tag={db.tag}
            containerId={db.containerId}
            id={db.$id}
          />
        ))}
      </div>
      <div className="divider"></div>
    </div>
  );
}
