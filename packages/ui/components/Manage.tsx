"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Manage({ id, DBLIST }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [containerInfo, setContainerInfo] = useState<any>({});
  const [env, setEnv] = useState<any>({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [serverDB, setServerDB] = useState<any>({});
  const [hostConfig,setHostConfig]=useState<any>({})
  const router = useRouter();

  const getENVFromDockerImage = (dockerImage: string): string[] | undefined => {
    const db = DBLIST.find((db: any) => db.dockerImage === dockerImage);
    return db ? db.ENV : undefined;
  };

  const convertArrayToObject = (array: string[]): { [key: string]: string } => {
    const obj: { [key: string]: string } = {};
    array.forEach((item) => {
      const [key, value] = item.split("=");
      obj[key] = value;
    });
    return obj;
  };

  const filterEnvByKeys = (env: { [key: string]: string }, keys: any) => {
    const filteredEnv: { [key: string]: string } = {};

    keys.forEach((key: any) => {
      if (env.hasOwnProperty(key)) {
        filteredEnv[key] = env[key];
      }
    });

    return filteredEnv;
  };

  const handleEnvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnv((prevEnv: any) => ({ ...prevEnv, [name]: value }));
    setIsSaveEnabled(true);
  };

  const handleSave = async () => {
    try {
      await fetch(`/db/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ENV: [env],
        }),
      }).then((res) => {
        router.refresh();
        setIsSaveEnabled(false);
      });
    } catch (error) {
      console.error("Error Updating", error);
    }
  };

  const handeContainerFunc = async (func: string) => {
    try {
      const response = await fetch(`/db/api/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          func: func,
        }),
      });
      const data = await response.json();
      router.refresh();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchContainerData = async (containerId: string) => {
    try {
      const response = await fetch(`/db/api/info/${containerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setContainerInfo(data);
      setHostConfig(data.HostConfig);
      const ENVs = getENVFromDockerImage(data.Config.Image.split(":")[0]);
      const contENV = convertArrayToObject(data.Config.Env);
      const filteredENV = filterEnvByKeys(contENV, ENVs);
      setEnv(filteredENV);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/db/api/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/containerInfo",
        },
      });
      const data = await response.json();
      setServerDB(data);
      fetchContainerData(data.containerId);
      console.log(serverDB, "serverDB");

      setLoading(false);
      console.log(loading, "loading true");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`/db/api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error deleting", error);
    }
  };
  useEffect(() => {
    fetchData();
  },);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="border border-white rounded-lg p-4 ">
      <h1 className="text-2xl font-bold mb-4">Manage Database</h1>
      <div className="flex flex-row gap-x-4 space-x-2">
        <h2 className="text-lg font-bold mb-2">Name</h2>
        <p>{containerInfo?.Name}</p>
      </div>
      <div className="flex flex-row gap-x-4 space-x-2">
        <h2 className="text-lg font-bold mb-2">Status</h2>
        <p>{containerInfo?.State?.Status}</p>
      </div>
      <div className="flex flex-row gap-x-4 space-x-2">
        <h2 className="text-lg font-bold mb-2">Type</h2>
        <p>{serverDB?.type}</p>
      </div>
      <div className="flex flex-row gap-x-4 space-x-2">
        <h2 className="text-lg font-bold mb-2">Tag / Version</h2>
        <p>{serverDB?.tag}</p>
      </div>
      <div className="flex flex-row gap-x-4 space-x-2">
        <h2 className="text-lg font-bold mb-2">Host</h2>
        <p>{JSON.stringify(hostConfig.PortBindings)}</p>
      </div>

      <h2 className="text-lg font-bold mb-2">Environment Variables</h2>
      <div  className="flex flex-row gap-x-4 space-x-8">
      <table>
      {env &&
        Object.keys(env).map((key: string) => (
          
            <tr>
              <td>
            <label htmlFor={key} className="mb-1">
              {key}
            </label>
            </td>
            <td>
            <input
              type="text"
              name={key}
              id={key}
              value={env[key]}
              onChange={handleEnvChange}
              readOnly
              className={`border border-gray-400 rounded px-2 py-1 w-full sm:w-64 ${
                containerInfo?.State?.Status === "running"
                  ? "bg-base-500 text-white disabled"
                  : "bg-base-500 text-white"
              }`}
            />
            </td>
            </tr>
          
        ))}
     
    </table>
    </div>
      <div className="space-x-2">
        <button
          className={`btn
            ${isSaveEnabled ? "btn-success" : "btn-disabled"}`}
          disabled={!isSaveEnabled}
          onClick={handleSave}
        >
          Save
        </button>
        {containerInfo && containerInfo?.State?.Status === "running" && (
          <>
            <button
              className="btn btn-info"
              onClick={() => handeContainerFunc("restart")}
            >
              Restart
            </button>
            <button
              className="btn btn-error"
              onClick={() => handeContainerFunc("stop")}
            >
              Stop
            </button>
          </>
        )}

        {containerInfo && containerInfo?.State?.Status === "exited" && (
          <button
            className="btn btn-success"
            onClick={() => handeContainerFunc("start")}
          >
            Start
          </button>
        )}
          {containerInfo && containerInfo?.State?.Status === "exited" && (
          <button
            className="btn btn-error"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
