import { DBCard } from "@flexidb/ui";
import { DBLIST } from "@flexidb/config/dbconfig";

function renderDBCards() {
  return DBLIST.map((dbinfo) => (
    <DBCard key={dbinfo.dockerimage} dbinfo={dbinfo} />
  ));
}

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 space-y-10">
        {renderDBCards()}
      </div>
    </div>
  );
}
