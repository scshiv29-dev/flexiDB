import React, { useEffect, useState } from 'react';

export default function DBstat(dbinfo: any) {
  const [status, setStatus] = useState<any>();
  useEffect(() => {
    fetch(`/db/api/status/${dbinfo.containerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStatus(data);
      });
  }, []);

  let badgeClass = '';
  let imgForDB = '';

  if (status === 'running') {
    badgeClass = 'badge badge-success';
  } else if (status === 'paused') {
    badgeClass = 'badge badge-warning';
  } else if (status === 'dead') {
    badgeClass = 'badge badge-danger';
  } else {
    badgeClass = 'badge badge-secondary';
  }

  if (dbinfo.type === "postgres") {
    imgForDB = "postgres.png";
  } else if (dbinfo.type === "mysql") {
    imgForDB = "mysql.png";
  } else if (dbinfo.type === "mariadb") {
    imgForDB = "mariadb.png";
  } else if (dbinfo.type === "mongo") {
    imgForDB = "/mongo.svg";
  } 
   return (
    <div className="card-container">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={imgForDB} alt="DB" className="h-60 w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
           Container Name:  {dbinfo.name}
            <div className={badgeClass}>{status}</div>
          </h2>
          <p className="text-xs text-blue-300">
            <span className="font-bold text-amber-400">{dbinfo.type}:</span> {dbinfo.tag}
          </p>
          <p className="text-xs text-base-900 max-h-20 overflow-hidden text-ellipsis">
            <span className="font-bold">Container ID:</span> {dbinfo.containerId}
          </p>
          <button 
          onClick={() => {
            window.location.href = `/db/${dbinfo.id}`;
          }}
          className="btn btn-primary mt-4 hover:btn-secondary">Manage</button>
        </div>
      </div>
    </div>
  );
}
