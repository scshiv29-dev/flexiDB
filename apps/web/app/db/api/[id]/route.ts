// path to this snippet:
// app/db/api/[id]/status/route.ts
//route :"/db/api/:id/"

import { getDatabase } from "@flexidb/appwrite";
export async function GET(){
    const {id} = this.params;
    const databases = await getDatabase(id);
    return { databases };

}
