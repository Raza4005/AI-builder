import React from 'react'
import { Loader2Icon } from '@radix-ui/react-icons'

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
        <Loader2Icon size={26} className="animate-spin text-zinc-950" />
    </div>
  )
}

export default Loading