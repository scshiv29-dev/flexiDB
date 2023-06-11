"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Manage } from "@flexidb/ui";
import { DBLIST } from "@flexidb/config/dbconfig";
export default async function Page() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center ">
      <Manage id={id} DBLIST={DBLIST} />
    </div>
  );
}
