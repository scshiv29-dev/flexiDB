import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import type {DBInfo} from "@flexidb/dockersol"
import Link from "next/link"
import {useRouter} from "next/navigation"
export function DBCard({dbinfo}:{dbinfo:DBInfo}) {
  const router=useRouter()
  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
           {dbinfo.name}
          </h1>
          
          <div className="mt-4">
          {dbinfo.tags.map(tag=>(
                   <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                     #{tag}
                 </span>
          ))}

          </div>
          <button 
          onClick={()=>{
            router.push(`/db/new/${dbinfo.dockerImage}`)
          }}
          className="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  )
}
