import { DBCard } from "@flexidb/ui";
import {DBLIST} from "@flexidb/config/dbconfig"
export default async function Page() {

   
    return (
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 space-y-10">
        {DBLIST.map((dbinfo) => (
          <DBCard key={dbinfo.dockerimage} dbinfo={dbinfo} />
        ))}
      </div>
        </div>
    );
    }


    
