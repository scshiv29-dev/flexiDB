import { getDatabases } from "@flexidb/appwrite";

export default async function Page() {
        const databases= await getDatabases();
        const db=databases.documents
       
   
    return (
        <div>
            {JSON.stringify(db)}
        </div>
    );
    }


    
