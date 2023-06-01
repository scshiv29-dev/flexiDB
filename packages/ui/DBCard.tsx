"use client"
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import Link from "next/link"
import {useRouter} from "next/navigation"

export function DBCard({dbinfo}:{dbinfo: {
  name: string;
  dockerImage: string;
  tags: string[];
  ENV: string[];
  PORT: number;
}}) {
  const router=useRouter()
  return (
    <div className="flex mt-4 max-w-2xl flex-col items-center rounded-md border md:flex-row">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">

        <img
          src={dbinfo.dockerImage=="mariadb"?"https://i.imgur.com/1y5Sr8V.jpg":dbinfo.dockerImage=="mysql"?"https://i.imgur.com/b3KRq0r.jpg":dbinfo.dockerImage=="postgres"?"https://i.imgur.com/KMOSlbX.jpg":"https://i.imgur.com/IV3NwFm.jpg" }
          alt="db"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
           {dbinfo.name}
          </h1>
          
          <div className="mt-4">
          {dbinfo.tags.map((tag: string )=>(
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
