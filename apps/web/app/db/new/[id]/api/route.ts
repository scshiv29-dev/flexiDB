import { createDatabase, getDatabases } from "@flexidb/appwrite";

export  async function GET(request: Request) {
    const databases = await getDatabases();
    return new Response(JSON.stringify(databases), {
        headers: {
            "content-type": "application/json",
        },
    });

}
