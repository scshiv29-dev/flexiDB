import { deleteDatabase, getDatabase } from "@flexidb/appwrite";
import { NextResponse } from "next/server";
import {
  startContainer,
  restartContainer,
  stopContainer,
  deleteContainer,
  changeContainerEnvVariable,
} from "@flexidb/dockersol";
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;

  const db = await getDatabase(id,process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  return new Response(JSON.stringify(db));
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  const { func } = await request.json();
  const db = await getDatabase(id,process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const containerId = db.containerId;
  if (func === "start") {
    const d = startContainer(containerId);
    return new Response(JSON.stringify(d));
  } else if (func === "restart") {
    const d = restartContainer(containerId);
    return new Response(JSON.stringify(d));
  } else if (func === "stop") {
    const d = stopContainer(containerId);
    return new Response(JSON.stringify(d));
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.log("delete");
  const id = params.id;
  const db = await getDatabase(id,process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const containerId = db.containerId;
  const d = deleteContainer(containerId);
  const dd = await deleteDatabase(id,process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  return new Response(JSON.stringify(dd));
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.log("put");
  const id = params.id;
  const db = await getDatabase(id,process.env.NEXT_PUBLIC_APPWRITE_URL,process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const { ENV } = await request.json();
  console.log(ENV);
  if (ENV) {
    const containerId = db.containerId;
    Object.entries(ENV).forEach(async ([key, value]) => {
      await changeContainerEnvVariable(containerId, key, ENV[key]);
    });
    return new Response(
      JSON.stringify({
        status: "success",
      })
    );
  }
}
