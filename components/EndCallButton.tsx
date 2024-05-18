'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    // import the call
    const call = useCall();
    // state of router to re navigate
    const router = useRouter();
    // get the main participant access
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    // check the current participant is meeting owner
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    if (!isMeetingOwner) return null;

    return (
    <Button onClick={async ()=> {
        await call.endCall();
        router.push('/')
    }} className='bg-red-500'>
        End Call for Everyone
    </Button>
  )
}

export default EndCallButton