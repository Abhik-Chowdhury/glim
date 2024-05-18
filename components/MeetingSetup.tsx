'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete: (value:boolean)=>void}) => {
  // the state to get the mic and camera allowance 
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  // the call from stream
  const call = useCall();

  // check the call is held or not
  if(!call){
    throw new Error('usecall must be used within StreamCall component')
  }
  useEffect(()=>{
    if(isMicCamToggleOn){
      call?.camera.disable();
      call?.microphone.disable();
    } else{
      call?.camera.enable();
      call?.microphone.enable()
    }
  },[isMicCamToggleOn, call?.camera, call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      {/* main stream setup component */}
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      {/* modifiation if the video and mic sections */}
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          {/* the mic and camera off with one check box */}
          <input
          type='checkbox'
          checked={isMicCamToggleOn}
          onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={()=>{
        call.join();
        setIsSetupComplete(true);
      }}>
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup