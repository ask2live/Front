import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {useSelector} from "react-redux"
import LiveSessionContainer from "../containers/LiveSessionContainer"
import ReserveToLive from "../components/ReserveToLive"
import axios from "axios"

const LIVE = "live"
const RESERVE = "reserve" 

const SessionMatchContainer = (props) => {
    const history = useHistory()
    const [match, setMatch] = useState()

    // console.log(props);
    const sessionKind = props.routerInfo.match.params.state;
    let urlSearchParams = new URLSearchParams(props.routerInfo.location.search.slice(1));
    // console.log(props);
    // console.log(sessionKind);

    const holeId = urlSearchParams.get("holeId");

    const tmp =  useSelector(state => state.user.data)
    const currUser = tmp.detail? tmp.detail.username : "";

    useEffect(() => {
        axios.get("https://143.248.226.7:8000/api/hole/read/"+holeId).then(
            (res) => {
                if (res.data.response === "SUCCESS")
                    setMatch(res.data.detail);
            }
        )
    },[holeId])
    
    switch (sessionKind) {
        case LIVE:
            const channelNum = urlSearchParams.get("channelNum");
            console.log("----Match----", match)
            if (match) 
            {
                if (match.status === "DONE")
                    return (
                    <>
                        <div style={{
                            position:"fixed",
                            display:"flex", 
                            width:"100%", 
                            height:"100%",
                            justifyContent:"center",
                            alignItems:"center",
                        }}>
                            <div>
                                <div style={{
                                    position:"relative",
                                    zIndex:"1",
                                    width:"15em",
                                    height:"15em",
                                    backgroundImage:"url('/static/wallcat.png')",
                                    backgroundSize:"contain",
                                    backgroundRepeat:"no-repeat",
                                }}></div>
                                <div style={{
                                    zIndex:"0",
                                    transform:"translate(0, -9em) rotate(7deg)",
                                    display:"flex", 
                                    justifyContent:"center",
                                    alignItems:"center",
                                    backgroundColor:"white",
                                    width: "15em",
                                    height:"4em",
                                    border:"2px solid grey"
                                }}
                                    >
                                    <p style={{fontSize:"1em"}} className="CookieRun">
                                        이미 라이브가 종료된 방입니다.
                                    </p>

                                </div>
                        
                            </div>
                        </div>
                        <div>

                        </div>
                        <div  style={{
                            position:"fixed",
                            display:"flex", 
                            justifyContent:"center",
                            alignItems:"center",
                            height:"100%",
                            width:"100%",
                            transform:"translate(0, 3em)"
                            }}>
                            <span
                            style={{cursor:"pointer", borderBottom:"1px solid black"}} 
                            className="Gmarket2"
                            onClick={()=>{
                                history.push("/main")
                            }}
                            >메인으로 가기</span>
                        </div>
                    </>)

                const isHost = (currUser === match.host_username);
                return <LiveSessionContainer holeTitle={match.title} hostName={match.host_username} hostImage={match.host_profile_image} holeId={holeId} channelNum={channelNum} joinPass={props.routerInfo.location.state?.joinPass} isHost={isHost}/>
            }
            else return <p>SessionMatchContainer LOADING</p> 

        case RESERVE:
            if (match)
                return <ReserveToLive holeTitle={match.title} hostName={match.host_username} hostImage={match.host_profile_image} holeId={holeId}/>
            else return <p>SessionMatchContainer LOADING</p> 
            
        default:
            return (
                <p>SessionMatchContainer ERROR</p>     
            )
        }
    // switch (sessionKind) {
    //     case LIVE:
    //         const holeId = urlSearchParams.get("holeId");
    //         const channelNum = urlSearchParams.get("channelNum");
    //         axios.get("https://143.248.226.7:8000/api/hole/read/"+holeId).then(
    //             (res) => {
    //                 if (res.data.response === "SUCCESS")
    //                 {
    //                     const isHost = (currUser === res.data.detail.host_username);
    //                     return <LiveSessionContainer hostName={res.data.detail.host_username} hostImage={res.data.detail.host_profile_image} holeId={holeId} channelNum={channelNum} joinPass={props.location.state?.joinPass} isHost={isHost}/>
    //                 }
    //                 else return <p>SessionMatchContainer GET ERROR</p> 
    //             }
    //         )
    //     case RESERVE: // 占쏙옙占쏙옙 호占쏙옙트占쏙옙 占쏙옙占식곤옙占쏙옙
    //         const holeId_reserve = urlSearchParams.get("holeId");
    //         console.log(holeId_reserve)
    //         axios.get("https://143.248.226.7:8000/api/hole/read/"+holeId).then(
    //             (res) => {
    //                 if (res.data.response === "SUCCESS")
    //                 {
    //                     return <ReserveToLive hostName={res.data.detail.host_username} hostImage={res.data.detail.host_profile_image} holeId={holeId_reserve}/>
    //                 }
    //                 else return <p>SessionMatchContainer GET ERROR</p> 
    //             }
    //         )
    //     default:
    //         return (
    //             <p>SessionMatchContainer ERROR</p>     
    //         )
    //     }
}

export default SessionMatchContainer