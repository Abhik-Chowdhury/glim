"use client"
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  // grab the authenticated user from the clerk
  const {user, isLoaded} = useUser()
  // the state to check the mic and camera full 
  // setup for the conference iscomplete
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  // import the custome hook for call query
  const {call, isCallLoading} = useGetCallById(id)
  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {/* isSetupComplete or not based on 
          render components*/}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete ={setIsSetupComplete}/>
          ): (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default Meeting