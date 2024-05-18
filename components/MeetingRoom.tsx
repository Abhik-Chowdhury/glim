import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'

// the Layout type 

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'
const MeetingRoom = () => {
  // get the allowance to check the the current meeting is personal room or not
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  // to change the layout for the room
  // maintain that change of layout state
  const [layout, setLayout] = useState('speaker-left')
  // state to manage the call participants
  const [showParticipants, setShowParticipants] = useState(false)
  // calling state 
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();
  // router 
  const router = useRouter();
  if(callingState !== CallingState.JOINED) return <Loader/>
  // the layout implement function
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='left' />
      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[550px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          {/* the render of participants */}

          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        {/* the video call controlled */}
        <CallControls onLeave={()=>router.push('/')}/>
        {/* the layout change Drop Down menu */}
        <DropdownMenu>
          <div className='flex items-center'>
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList size={20} className='text-white'/>
          </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index)=>(
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer' onClick={()=>{
                  setLayout(item.toLowerCase() as CallLayoutType)
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>

        {/* button for hide or show participants */}
        <button onClick={()=>setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white'/>
          </div>
        </button>
        {/* based on the personal room end the meeting */}
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  )
}

export default MeetingRoom