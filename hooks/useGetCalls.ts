import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
    // the state to fetch all upcoming calls
    const [calls, setCalls] = useState<Call[]>();
    // Loading state while fetching the call
    const [isLoading, setIsLoading] = useState(false);
    // the stream video client to fetch the calls
    const client = useStreamVideoClient();
    // the calls are fetched for the specific user
    // fetch the use from the clerk
    const {user} = useUser();

    useEffect(()=>{
        const loadCalls = async ()=>{
            if(!client || !user?.id) return;
            setIsLoading(true);
            try {
                const {calls} = await client.queryCalls({
                    sort:[{field: 'starts_at',direction:-1}],
                    filter_conditions:{
                        starts_at:{$exists:true},
                        $or:[
                            {created_by_user_id:user.id},
                            {members:{$in:[user.id]}},
                        ]
                    }
                });
                setCalls(calls)
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };
        loadCalls();
    }, [client,user?.id])
    

    // to check call with the now time
    const now = new Date();
    // return the calls in add on filteration

    // the ended call logic that the starting time of the call and date of starting 
    // less than current time or its ended
    const endedCalls = calls?.filter(({state:{startsAt,endedAt}}:Call)=>{
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })

    // the upcoming call logic that the starting time of the call and date of starting 
    // greater than current time
    const upcomingCalls = calls?.filter(({state:{startsAt}}:Call)=>{
        return startsAt && new Date(startsAt) > now
    })
    

    return{
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading,
    }
}