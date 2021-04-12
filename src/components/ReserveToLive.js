import React from "react";
import {useSelector} from "react-redux"
import JoinCard from "./JoinCard"
import LiveSessionContainer from "../containers/LiveSessionContainer"

const ReserveToLive = (props) => {
    // console.log("Enter : ReserveToLive")

    const holeId = props.holeId
    const sessions = useSelector(state => state.session.data)
    let channelNumAry = []

    sessions.map((session) => {
        channelNumAry = [...channelNumAry, session.livehole_id];
    })

    let channelNum;

    while (true)
    {
        channelNum = Math.floor(Math.random() * 10001)
        if (channelNumAry.indexOf(channelNum) == -1)
            break
    }

    // console.log("MakeChannelNum", channelNum);
    // console.log("ReserveToLive Props", props);

    return <LiveSessionContainer hostName={props.hostName} hostImage={props.hostImage} holeId={holeId} channelNum={channelNum} isHost={true}/>
}

export default ReserveToLive