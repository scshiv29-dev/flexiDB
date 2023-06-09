import * as React from 'react'

export function SolidButton({text}: {text: string}) {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        {text}
    </div>
  )
}
