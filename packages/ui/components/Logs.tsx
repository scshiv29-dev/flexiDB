"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { getDatabase } from "@flexidb/appwrite";
export default function Logs({ containerId }: { containerId: string }) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch(`/db/api/logs/${containerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setLogs(data);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="flex justify-center">
      <div className=" mockup-code ">
        <pre>
          <code className="w-96">{logs}</code>
        </pre>
      </div>
    </div>
  );
}
