import { NextResponse } from "next/server";
import { getContainerInfo } from "@flexidb/dockersol";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;

  const logs = await getContainerInfo(id);
  const { Name, State, Config, HostConfig } = logs;
  return NextResponse.json({ Name, State, Config, HostConfig });
}
