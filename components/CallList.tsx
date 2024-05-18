//@ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  // get the custome hook to fetch calls
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  // now check in which router the user is in
  const router = useRouter();

  // for recoding the state to manage the all recordings
  const [recordings, setRecordings] = useState<CallRecording[]>([])

  // import toast for fetchcalls
  const { toast } = useToast();
  // the call fetch function to fetch calls 
  // depending on the router page
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  }


  // fucntion for no call message
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  }

  // fetch recording for specific call
  useEffect(() => {
    const fetchRecordings = async () => {

      try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

        const recordings = callData.filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings)

        setRecordings(recordings);
      } catch (error) {
        toast({title: 'Try again later'})
      }


    }
    if (type === 'recordings') fetchRecordings();
  }, [type, callRecordings])

  // dynamic calls to fetch the calls then map with 
  // based on route with out makking separated section for each type of call
  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();
  // the loader apearence
  if (isLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {/* map the calls */}
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id}
          icon={
            type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
          }
          title={(meeting as Call).state?.custom?.description?.substring(0, 20) || meeting?.filename?.substring(0, 20) || 'Personal Meeting'}
          date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
          isPreviousMeeting={type === 'ended'}
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
          link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}

        />
      )) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  )
}

export default CallList