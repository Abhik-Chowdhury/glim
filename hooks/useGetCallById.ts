import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById = (id: string | string[]) =>{
    // the state for call set up
    const [call, setCall] = useState<Call>()
    // Loading call state
    const [isCallLoading, setIsCallLoading] = useState(true)
    // the stream client
    const client = useStreamVideoClient();
    // fetch the client
    useEffect(() => {
    if(!client) return;
    const loadCall = async()=>{
        // query the exixting calls
        const {calls} = await client.queryCalls({
            filter_conditions:{
                id
            }
        })
        // check the calls length
        if(calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false)

    }
    loadCall();
    }, [client, id]);

    return {call,isCallLoading}
    
}