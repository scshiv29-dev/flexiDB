"use client"
import {DBLIST} from "@flexidb/config/dbconfig"
import { DBCard,useAuth } from "@flexidb/ui";
import LoginPage from "./login";

export default function Page() {


  const {isLoggedIn}=useAuth()

  return (
    <div>
      {!isLoggedIn ?(
        <LoginPage/>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 space-y-10">
        {DBLIST.map((dbinfo) => (
          <DBCard key={dbinfo.dockerimage} dbinfo={dbinfo} />
        ))}
      </div>
      


      )}
    </div>
  );
}
