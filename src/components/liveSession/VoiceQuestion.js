import React, {useCallback, useState, useEffect} from "react";
import Avatar from "../Avatar"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import "../../styles/style.css"
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:"center",
        '& > *': {
          margin: theme.spacing(0),
        },
      },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },

  }));   

const VoiceQuestion = (props) => {
    console.log("무야호", props)
    const classes = useStyles();
    const [click, setClick] = useState(false)
    const [clickStyle, setClickStyle] = useState({color: "#EF5941"})
    const [finish, setFinish] = useState(false);
    const [exitClick, setExitClick] = useState(false);

    const [hidden, setHidden] = useState("0")


    useEffect(()=>{
        setTimeout(()=>{setHidden("1")}, 1000);
    })

    const sendP2PMessage = useCallback((recipientUID, peerMsg) => {
        console.log("sendP2PMessage");
    
        // An RtmMessage object.
        const remoteUID = String(recipientUID);
    

        // p2p message
        console.log("리모트 UID: ", remoteUID);
        console.log("리모트 msg: ", peerMsg);
    
        if (peerMsg) {
          (props.rtmClient)
            .sendMessageToPeer({ text: peerMsg }, remoteUID)
            .then((sendResult) => {
              if (sendResult.hasPeerReceived) {
                console.log("peer recieved " + peerMsg + " successfully");

              } else {
                console.log("peer did not recieved " + peerMsg + " unlog");
              }
            })
            .catch((error) => {
              console.log("RTM message recieved err");
            });
        }
      }, []);

    return (
        <>
        <div style={{
            zIndex: "1",
            position:"fixed",
            top:"5%",
            display:"flex",
            maxWidth:"45em",
            width:"100%",
            height:"25%",
            justifyContent:"center",
            alignItems:"center",
            transform:"translate(25%,71%)",
            transition : "opacity 1s",
            opacity:hidden}}>

            <div style={{
                zIndex: "1",
                marginTop:"13px",
                width:"6em"}}>
                <div style={{zIndex: "1",width:"5.6em"}}>
                    <Avatar 
                    userUid={props.userUid}
                    isHostAvatar={false}
                    style={{zIndex: "1"}} 
                    alt={props.userNickName} 
                    imageLink={props.imageLink} 
                    className={classes.large}/>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <p className="BMDOHYEON" style={{marginTop:"5px", marginLeft:"-8px", color:"rgba(255,255,255,0.8)"}}>{props.userNickName}</p>
                </div>
            </div>
        </div>
        <div style={{
            transition : "opacity 1s",
            opacity:hidden, 
            zIndex: "0",
            top:"22.5%",
            position:"fixed", 
            height: "25%",
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center", 
            width:"100%", 
            maxWidth:"45em"}}>

            <div style={{}} className="voicePlane">
                <div style={{
                    border: "1px solid #EF5941",
                    position:"absolute",
                    width:"100%",
                    height:"4em",

                }}>
                <div className="voicePlaneC1">
                    <div style={{
                        width :"1.5em",
                        height:"1.5em",
                        backgroundImage: "url('/static/wave2.jpg')",
                        backgroundSize:"contain",
                    }}/>
                    {/* <SendIcon/>     */}
                </div> 
                <div className="voicePlaneC2">
                    <div style={{
                        width :"1.5em",
                        height:"1.5em",
                        backgroundImage: "url('/static/wave2.jpg')",
                        backgroundSize:"contain",
                    }}/>
                    {/* <SendIcon/> */}
                </div>

                </div>
            </div>
            <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"flex-end",
            width:"12em", 
            height:"145%"}}>
                {props.isHost?
                <>
                <button
                className="audienceLink"
                disabled={click}
                onClick={()=>{setClickStyle({color:"grey"});setClick(true); sendP2PMessage(props.userUid, "host")}}
                >
                    <span style={clickStyle} className="NanumGothic3">연결하기</span>
                </button>
                <button
                className="linkExit"
                disabled={exitClick}
                style={{zIndex:"1",backgroundColor:"#3B3B3B"}}
                onClick={()=>{
                    setClick(true);
                    setFinish(true);
                    setExitClick(true);
                    sendP2PMessage(props.userUid, "audience")
                    props.onAnswered(props.currentQuestionId)
                    setTimeout(() => {
                        setFinish(false);
                        setExitClick(false);
                        setClick(false);
                        setClickStyle({color:"#EF5941"});
                    }, 4000);
                }}
                >
                {   finish?
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className="loadingCircle"></div> 

                    </div>
                    :
                    <span style={{color: "white"}} className="NanumGothic3">답변완료</span>

                }
                </button>
                </>
                :
                <>
                </>
                }
            </div>


        </div>

        </>
    )

}

export default VoiceQuestion;