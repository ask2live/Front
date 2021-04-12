import React, {useState, useEffect, useRef, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from "react-router-dom"
import axios from "axios"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import getEnteredSession from "../../actions/EnteredSessionActions"
import getQuestionList from "../../actions/QuestionListActions";
import {
    QUESTIONLIST_DELETE,
    ENTEREDSESSION_DELETE,
    CLEAR_VOLUME,
} from "../../actions/types.js";



import ParticipantList from "./ParticipantList";
import CurrentQuestion from "./CurrentQuestion";

import QuestionList from "./QuestionList";
import Questioning from "./Questioning";
import Chat from "./chatting/Chat";
import Avatar from "../Avatar";
import "../../index.css"
import PlayerWrapper from "./agora/PlayerWrapper";
import { onRoomMessagesRead } from '../../actions/MessagesActions';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseListButton from '@material-ui/icons/ExpandMore';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MicIcon from '@material-ui/icons/Mic';

import "../../styles/style.css"


//^ =============================================================
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import useAgora from "./agora/useAgora";
//^ =============================================================

const StyledBadge = withStyles((theme) => ({
    badge: {
        marginRight: theme.spacing(3),
        width: 30,
        height: 30,
      top: 13,
      borderRadius: "20px",
      border: `3px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const style = {
    livewrapper: {
        display: "inline-block",
        width: "100%",
        position: "fixed",
        height: "100%",
        // backgroundColor: "rgb(255, 239, 196)"
    },

    livesession: {
        position:"absolute",
        maxWidth: "45em",
        minHeight: "35em",
        width: "100%",
        height: "100%",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        backgroundColor: "#252525",
    },

    session_top: {
        zIndex:"4",
        position: "relative",
        minHeight: "3em",
        height: "5%",
        width: "100%",
    },
    
    
    session_mid: {
        position: "relative",
        height: "55%",
        width: "100%",
    },
    
    session_bottom: {
        position: "relative",
        borderRadius: "30px 30px 0px 0px",
        bottom: "0%",
        height: " 40%",
        width: "100%",
        backgroundColor: "#252525",
        zIndex:"0",
        // backgroundColor: "rgb(255, 248, 225)"
    },
    table: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    td1: {
        width: "60%",
        fontSize: "1em",
        padding: "10px 0 0 10px",
        color: "rgba(255,255,255,0.8)"
    },

    td2: {
        width: "9em",
        padding: "0 0 0 10px",
    },
    lavel : {
        marginLeft: "-12px",
        marginRight: "-0.7em",
    },
    font_size : {
        fontSize : "1rem"
    },
    checkIcon : {
        height: "0.6em"
    },

    tablecell: {
        display: "table-cell",
        verticalAlign: "middle",
        height: "100%",
    },
    follow: {
        marginRight: "3px",
        float: "right",
    },

    question: {
        width : "90%",
    },

    listbutton : {
        position: "absolute",
        top: "-0.5em",
    },

    alert : {
        boxShadow: "2px 2px 2px 2px #D95032",    // 섀도우 색
        border:"2px solid #4CC0D0",    // 테두리 색
        backgroundColor:"white"      // 배경색
    },

    closeBtn : {
        borderRadius:"10px",
        position:"absolute",
        top: "1em",
        right: "1em",
        width: "2em",
        height: "2em",
        background:"rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
    linkBtnWrap : {
        borderRadius:"10px",
        position:"absolute",
        top: "1em",
        right: "3.5em",
        width: "2em",
        height: "2em",
        backgroundColor:"rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    linkBtn : {
        marginLeft: "1px",
        width: "1.8em",
        height: "1.8em",
        backgroundImage: "url('/static/linkBtn.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    }
   
}


//^ =============================================================
const appid = "2e5346b36d1f40b1bbc62472116d96de";
const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
const rtmClient = AgoraRTM.createInstance(appid);


//^ =============================================================

const LiveSession = (props) => {
    const history = useHistory();
    // console.log("!!!!!!!!!!!!!!!!!", props);
    // console.log("history state: ", history.state)
    // history.pushState(null, null, '');
    // console.log("history state: ", history.state)
    const dispatch = useDispatch()


    const hostPostApi = async(hostUid) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              channel_num : props.channelNum,
              host_uid : hostUid,
          };
        //   console.log("LiveSession Host Post :", data);
          const res = await axios.post(
            "https://www.ask2live.me/api/hole/"+props.holeId+"/live/create",
            data,
            {headers:headers}
          );
        //   console.log(res.data);
    }
    
    const audiencePutApi = async(audienceUid) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              uid : audienceUid,
          };
        //   console.log("LiveSession Audience Post :", data);
          const res = await axios.put(
            "https://www.ask2live.me/api/hole/"+props.holeId+"/live/join/"+props.channelNum,
            data,
            {headers:headers}
          );
        //   console.log(res.data);
    }

    const leavePatchApi = async() =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {};
          const res = await axios.patch(
            "https://www.ask2live.me/api/hole/"+props.holeId+"/live/leave/"+props.channelNum,
            data,
            {headers:headers}
          );
        //   console.log("--------leavePatch-----",res.data);
        //   if (res.data.response === "SUCCESS"){
        //   }
    }


    const [listup, setListUp] = useState({transform : "translate(0, 100%)"})
    const [queUp, setQueUp] = useState({transform : "translate(0, 100%)"})
    const [userUp, setUserUp] = useState({transform : "translate(0, 100%)"})
    const [dark, setDark] = useState({display:"none"})

    const [room, setRoom] = useState({});
    const [open, setOpen] = useState(false);

    const [questionAlert, setOuestionAlert] = useState(false);
    const [copiedAlert, setCopiedAlert] = useState(false);
    // const [refreshAlert, setRefreshAlert] = useState(false)

    const [liveVoice,setLiveVoice] = useState(false);

    const [roomSocket, setRoomSocket] = useState(null);



    const openQuestionAlert = () => {
        setOuestionAlert(true);
      };
    
    const closeQuestionAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
        setOuestionAlert(false);
    };

    const openCopiedAlert = () => {
        setCopiedAlert(true);
      };
    
    const closeCopiedAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
        setCopiedAlert(false);
    };
    // const history = useHistory()
    
    const holeInfo = useSelector(state => state.enteredSession)
    const hostImage = holeInfo.arrived ? 
            holeInfo.data.detail.livehole.host_profile_image_url
            : "/static/live_png";

    // partiNum = holeInfo.arrived ? 
    //      holeInfo.data.detail.participant.length + "명"
    //     : "로딩중"

    // 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
    const handleClick = () => {
        // console.log("호스트 나감2", hostExit)
        setOpen(true);
    };
    
    // 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
    const handleClose = (event, reason) => { 
        console.log("host out")
        // history.replace('/main')
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setTimeout(()=>window.location.replace('/main'), 300);
    };
    
    //^ =============================================================
    let rtmChannel;

    const {
        localAudioTrack,
        leave,
        join,
        joinState,
        remoteUsers,
        authority,
    } = useAgora(client);
    
    
    useEffect(() => {
        
        const unblock = history.block('정말 떠나시겠습니까?');
        // 소켓 관련 -------
        
        const refreshOut = () => {
            // console.log("refresh out")
            // history.replace('/main')
            rtmClient.logout();
            leave();
            leavePatchApi();
            // roomSocket && roomSocket.close();
            setTimeout(()=>window.location.replace('/main'), 300)
        };
        
        const beforeUnloadListener = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener("beforeunload", beforeUnloadListener);
        window.addEventListener("pagehide", refreshOut);
        // window.onpagehide =  function(event) { // BFCahe
        //     if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        //         // console.log("onpageshow out ")
        //         refreshOut();
        //     }
        // }
        
        roomSocket && roomSocket.close();
        setRoomSocket(dispatch(onRoomMessagesRead(props.holeId, props.channelNum)));
    
        // 소켓 관련 끝 ------
        
        dispatch({type: QUESTIONLIST_DELETE})
        dispatch({type: ENTEREDSESSION_DELETE})
        dispatch({type: CLEAR_VOLUME});
        setLiveVoice(false)
        
        dispatch(getQuestionList(props.holeId))
        setTimeout(()=>dispatch(getEnteredSession(props.channelNum)),4500);
        
        //! 소켓으로 바꾸는중
        
        rtmChannel = rtmClient.createChannel(props.channelNum);
        join(props.channelNum, null, rtmClient, rtmChannel, props.isHost);
        rtmChannel.on('ChannelMessage', (message, memberId) => {
            // console.log(`Message ${message}, from ${memberId}`);
            
            rtmClient.logout();
            leave();
            leavePatchApi();
            // roomSocket && roomSocket.close();
            //! 소켓으로 바꾸는중
            handleClick();
        });

        if (props.isHost){
            setTimeout(()=>{hostPostApi(client.uid)}, 4000);
        }
        else{
            setTimeout(()=>{audiencePutApi(client.uid)}, 4000);
        }
             
        return () => {
            // console.log("normal out")
            unblock();
            window.removeEventListener("beforeunload", beforeUnloadListener);
            window.removeEventListener("pagehide", refreshOut);

            if (props.isHost)
            {
                rtmChannel.sendMessage({ text: "hostOut" }).then(() => {
                    // Your code for handling the event when the channel message is successfully sent.
                    // console.log('host is leaving')
                    }).catch(error => {
                    // Your code for handling the event when the channel message fails to be sent.
                    // console.log('host leaving error')
                });
            }
            
            rtmClient.logout();
            leave();
            leavePatchApi();
            // roomSocket && roomSocket.close();
            
            // history.replace('/main');
            setTimeout(()=>window.location.replace('/main'), 500);
            
        }
        

    }, [history])

    // ^ =============================================================
    
    

    return (
        <>
        <div style={style.livewrapper}>
            <div style={style.livesession}>
                <div style={style.session_top}>
                    <table style={style.table}>
                        <tr>
                            <td  colspan="2" className="NanumGothic4" style={style.td1} >{props.holeTitle}</td>
                            <td  rowspan="2">
                                <div style={style.follow}>
                                <div
                                    style={style.closeBtn}
                                    onClick={()=>history.push('/main')}
                                    >
                                        <span 
                                        className="NanumGothic2"
                                        style={{fontSize: "0.6em"}}>종료</span>
                                </div>
                                <div
                                style={style.linkBtnWrap}
                                >
                                    <CopyToClipboard
                                        onCopy={openCopiedAlert}
                                        text={window.location.href}
                                    >
                                    <div style={style.linkBtn}/>
                                    </CopyToClipboard>
                                </div>
                                
                                </div>
                                
                            </td>      
                        </tr>
                        <tr>
                            <td style={style.td2}>
                                <img className="live_img" src="/static/live.png"/>
                                <span style={{marginLeft:"9px", color:"rgba(255, 255, 255, 0.6)"}} className="NotoSans3">{remoteUsers.length + 1}명</span>
                            </td>
                            <td></td>
                        </tr>

                    </table>  
                </div>
                <div style={style.session_mid}>
                    <div style={{position:"relative", height:"40%"}}>
                        <div className="forLiveWrapper" 
                        style={liveVoice?
                        {transform:"translate(-25%, 70%)"}
                        :
                        null
                        }>
                                <div className="forLiveVoice">
                                    <tr>
                                    <StyledBadge badgeContent={<MicIcon/>} color="error">
                                        <Avatar isHostAvatar={true} hostName={props.hostName} imageLink={props.imageLink}/>
                                    </StyledBadge>
                                    </tr>
                                    <tr className="centered">
                                        <span style={{color: "rgba(255,255,255,0.8)"}}className="BMDOHYEON">{props.hostName}</span>
                                    </tr>
                                </div>
                        </div>
        
                     
                    </div>
                    <div style={{position:"relative", height:"50%"}}>
                        {/* <Grid container justify="center"> */}
                            <div>
                                 <CurrentQuestion 
                                 roomSocket={roomSocket}
                                 setLiveVoice={setLiveVoice}
                                 liveVoice={liveVoice}
                                 holeId={props.holeId} 
                                 isHost={props.isHost}
                                 client={client}
                                 rtmClient={rtmClient}
                                 host={authority}
                                 localAudioTrack={localAudioTrack}
                                 remoteUsers={remoteUsers}
                                 channelNum={props.channelNum}
                                 />
                            </div>
                        {/* </Grid>  */}
                    </div>

                </div>
                <div style={style.session_bottom}>
                    <div className="chattingWrapper"/>
                    <Chat 
                    roomSocket={roomSocket}
                    holeId={props.holeId} 
                    isHost={props.isHost} 
                    channelNum={props.channelNum} 
                    goQueUp={setQueUp} 
                    goListUp = {setListUp} 
                    goUserUp = {setUserUp} 
                    goDark={setDark} 
                    room={room} 
                    windowHeight="1000px" 
                    onBack={()=>setRoom(null)}/>                   
                </div>
            
           
        </div>
        {props.isHost?
        <div style={userUp} className="hiddenlist">
            <ParticipantList holeId={props.holeId} channelNum={props.channelNum} goUserUp = {setUserUp} goDark={setDark}/>
            <IconButton style={style.listbutton} onClick={()=>{setUserUp({transform : "translate(0, 100%)"}); setDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{setDark({display: "none"})}, 700)}} aria-label="question_list">
                <CloseListButton fontSize="large"/>
            </IconButton>
        </div>
        :   
        <div style={queUp} className="hiddenQue">
            <Questioning roomSocket={roomSocket} openQuestionAlert={openQuestionAlert} holeId={props.holeId} goQueUp = {setQueUp} goDark={setDark}/>
        </div>
        }
        <div style={listup} className="hiddenlist">
            <QuestionList holeId={props.channelNum} goListUp = {setListUp} goDark={setDark}/>
            <IconButton style={style.listbutton} onClick={()=>{setListUp({transform : "translate(0, 100%)"}); setDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{setDark({display: "none"})}, 700)}} aria-label="question_list">
                <CloseListButton fontSize="large"/>
            </IconButton>
        </div>

        <div style={dark} className="layerfordark"></div>

        </div>
        <Snackbar style={{position: "fixed", bottom:"50%"}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} style={style.alert} severity="success">
            <span className="BMJUA">호스트 [{props.hostName}]가<br/>세션을 종료하였습니다</span>
        </Alert>
        </Snackbar>

        <div className="host-player">
            <PlayerWrapper
                client={client}
                // rtmClient={rtmClient}
                // host={authority}
                localAudioTrack={localAudioTrack}
                remoteUsers={remoteUsers}
                // channelNum={props.channelNum}
            />
        </div>
        <Snackbar style={{position: "fixed", bottom:"50%"}} open={questionAlert} autoHideDuration={1500} onClose={closeQuestionAlert}>
            <Alert onClose={closeQuestionAlert} style={{ backgroundColor:"white", boxShadow: "2px 2px 2px 2px #D95032", border:"2px solid #4CC0D0"}} severity="success">
                <span className="BMJUA">질문 등록 성공!</span>
            </Alert>
        </Snackbar>

        <Snackbar style={{position: "fixed", bottom:"50%"}} open={copiedAlert} autoHideDuration={1500} onClose={closeCopiedAlert}>
            <Alert onClose={closeCopiedAlert} style={{ backgroundColor:"white", boxShadow: "2px 2px 2px 2px #D95032", border:"2px solid #4CC0D0"}} severity="success">
                <span className="BMJUA">링크 복사 완료</span>
            </Alert>
        </Snackbar>
        </>
    )

}

export default LiveSession