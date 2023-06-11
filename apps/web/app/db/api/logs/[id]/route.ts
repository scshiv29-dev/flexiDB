import { NextResponse } from "next/server";
import { getContainerInfo, getContainerLogs } from "@flexidb/dockersol";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;

  const logs = await getContainerLogs(id);

  return NextResponse.json(logs);
}
