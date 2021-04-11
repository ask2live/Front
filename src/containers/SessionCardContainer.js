import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import {MyLiveSessionsCards, OtherLiveSessionsCards, CurrentReserveSessionsCards, HostConfirmedSessionsCards} from '../components/sessionCard' 
import {SessioinCreateButton} from '../components/SessionCreateButton';
import  ProfileEditButton from "../components/ProfileEditButton";
// material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Person } from '@material-ui/icons';
import {useHistory} from "react-router-dom"

import "../styles/style.css"
import "../App.css"
import { Opacity } from '@material-ui/icons';

const [MyPageIcon] = [Person];

let myLiveSessions = []
let otherLiveSessions = []
let currentReserveSessions = []
let hosts = []
let hostConfirmedSessions = []

const style = {
    mainLogo : {
        backgroundImage : "url('/static/LogoWhite.png')",
        backgroundSize : "contain",
        backgroundRepeat : "no-repeat",
        width : "8em",
        height : "3em",
        margin : "0.5em 0 0 1.5em"
    },
    mainOragne: {
        position : "absolute",
        backgroundColor: "#eb4e27",
        height : "15em",
        width: "100%",
        zIndex : "-1",
        overflow: "hidden",
    },
    descript: {
        fontSize: "1.2em",
        color: "white",
        paddingLeft: "1.2em"
    },
    descript2: {
        fontSize: "1.2em",
        color: "#1C418C",
        paddingLeft: "1.2em"
    },
    cookie1: {
        backgroundImage: "url('/static/cookie.png')",
        top : "3em",
        right : "-2.5em",
    },
    cookie2: {
        backgroundImage: "url('/static/cookie.png')",
        top : "-1.5em",
        width: "2em",
        backgroundRepeat: "no-repeat",
        left : "60%",
    },
    button : {
        position: 'relative',
        width: '80%',
        marginBottom: '20px',
    },
    buttonIcon: {
        fontSize: 30,
        fontColor: 'black',
        backgroundColor: '#C0C0C0',
        borderRadius: '50%',
        marginLeft: '150%',
    },
    buttonText: {
        align: 'left',
        fontSize: '80%',
        margin: '8px',
        marginLeft: '-20%',
        fontWeight: 900,
    },
    swiperLeft : {
        backgroundImage: "url('/static/toLeft.png')",
    },
    swiperLeftHidden : {
        display : "none"
    },
    swiperRight: {
        backgroundImage: "url('/static/toRight.png')"
    },
    swiperRightHidden : {
        display : "none"
    },
    logOut : {
        position :"absolute",
        transform:"translate(-0.5em, -3em)",
        right: "0%",
        color: "white",
        cursor:"pointer",
    }
}

    
const SessionCardContainer = (props) => {
    const [flag, setFlag] = useState(false);

    const user = useSelector(state => state.user);
    const sessions = useSelector(state => state.session.data);
    const history = useHistory();
    const mySession = useSelector(state => state.mySession.data);

    const wrapperCnt = (cnt) => {
        let defaultSize = 270;
        const rst = cnt * defaultSize;
        return rst.toString() + "px";
    }

    if(user.error){
        localStorage.clear()
        window.location.replace('/')
    }

    if(Object.keys(sessions).length != 0){
        let userDetail;
        if(user.data.detail){
            userDetail = user.data.detail
        }else{
            userDetail = {id:-1} // 반찬고 >_<
        }
        myLiveSessions = []
        otherLiveSessions = []
        currentReserveSessions = []
        hostConfirmedSessions = []
        hosts = []

        sessions.map((session) => {
            console.log(session)
            if (session.status == "DOING" && session.hole_reservations && (session.hole_reservations).guests.indexOf(userDetail.id) != -1) {
                myLiveSessions = [...myLiveSessions, session];
                console.log("myLiveSEssion:",myLiveSessions)
            }
            else if (session.status == "DOING") {
                otherLiveSessions = [...otherLiveSessions, session];
                console.log("otherLiveSessions",otherLiveSessions)
            }
            else if (session.hole_reservations && session.hole_reservations.status=="HOST_CONFIRMED"){
                hostConfirmedSessions = [...hostConfirmedSessions, session];
                console.log("hostConfirmedSessions",hostConfirmedSessions)
            }else{
                currentReserveSessions = [...currentReserveSessions, session];
                console.log("currentReserveSessions",currentReserveSessions)
            }
        })
    }


    const [swiperCnt, setSwiperCnt] = useState(1);

    const leftBtnTrigger = () => {
        if (swiperCnt == 1){
            return style.swiperLeftHidden
        }
        else 
            return style.swiperLeft
    }
    const rightBtnTrigger = () => {
        if (myLiveSessions.length == 1 || swiperCnt == myLiveSessions.length)
            return style.swiperRightHidden
        else
            return style.swiperRight
    }

    const swipping = () => {
        const where = swiperCnt == 1 ? "0" : ((swiperCnt - 1) * -270).toString() 
        return "translate(" + where.toString(where) + "px, 0)"
    } 

    const Logout = async() => {
        const headers = {
          'Authorization': 'Token ' + localStorage.token
        }
        const data = {}
        const res = await axios.post('https://www.ask2live.me/api/user/logout', data, {headers:headers})
        // window.location.replace('/')
      }




    return (
        <>
        <div style={style.mainOragne}>
            <div style={style.cookie1} className="helloCookie"/>
        </div>
        <div style={{float: "right", transform: "translate(-1em, 0.6em)", textAlign: "center", color: "white"}}>


                <IconButton color="inherit" aria-label="mypage" style={{}}>
                    <MyPageIcon style={{border: "2px solid", borderColor: "white", borderRadius: "100%"}} onClick={ () => {
                    history.push("/mypage");
                    } }/>
                </IconButton>


        </div>
        <br></br>
        
        <div style={style.mainLogo}/>
        {/* <span 
        className="BMJUA" 
        style={style.logOut}
        onClick={()=> {
            Logout()
            localStorage.clear()
            window.location.replace('/')
            }}
        >로그아웃</span> */}

            {
                myLiveSessions.length == 0 ?
                <>
                <br/>
                <div style={style.descript} className="NotoSans2">
                어서오세요!<br/>
                ASK2LIVE를 즐겨보세요!
                </div>
                </>
                :
                <>
                <div
                style={{
                    backgroundImage: "url('/static/mainLive.png')",
                    backgroundSize : "contain",
                    backgroundRepeat : "no-repeat",
                    width: "25px",
                    height :"25px",
                    marginLeft : "1.5em",
                }}/>
                <div style={style.descript} className="NotoSans2">
                찜했던<br/>
                Live Q&A가 시작했어요!
                </div>
                </>
            } 
        
        <br/>

 

            { myLiveSessions.length != 0 ?
            <> 
                <Grid container justify="center">
                    <div className="myLiveWrapper">
                        <div className="myLive" style={{display:"block", height: "300px", width: wrapperCnt(myLiveSessions.length), transform: swipping()}}>
                            <MyLiveSessionsCards myLiveSessions={myLiveSessions} />
                        </div>
                        <div
                        style={leftBtnTrigger()}
                        onClick={()=>{
                            setSwiperCnt((prev) => prev - 1)
                        }}
                        className="swiperLeft"/>
                        <div
                        style={rightBtnTrigger()}
                        onClick={()=>{
                            setSwiperCnt((prev) => prev + 1)
                        }}
                        className="swiperRight"/>
                    </div>
                </Grid>
            </>
            : <></>
            }

        <br></br>
        <SessioinCreateButton noMyLive={myLiveSessions.length == 0}/>



        <p style={style.descript2} className="Gmarket2">LIVE 중인 Q&A</p>
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { otherLiveSessions.length != 0 ? <OtherLiveSessionsCards otherLiveSessions={otherLiveSessions}/> : <p>라이브 중인 다른 세션이 없어요</p> }
        </Grid>
    
        <br/>
        <ProfileEditButton user={user}/>

        <p style={style.descript2} className="Gmarket2">다가오는 LIVE Q&A</p>

        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { hostConfirmedSessions.length != 0 ? <HostConfirmedSessionsCards hostConfirmedSessions={hostConfirmedSessions}/> : <p>예정된 다른 세션이 없어요</p> }
        </Grid>

        <div className="center divider">
            <Divider variant="middle"/>
        </div>

        <p style={style.descript2} className="Gmarket2">오픈 신청중인 LIVE Q&A</p>
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { currentReserveSessions.length != 0 ? <CurrentReserveSessionsCards currentReserveSessions={currentReserveSessions} setFlag={setFlag}/> : <p>요청 받고있는 다른 세션이 없어요</p>}
        </Grid>

        {/* <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { hosts.length != 0 ? <HostCards hosts={hosts}/> : <p>등록된 호스트가 없어요</p>}
        </Grid> */}

        
        </>

    
    )
};

export default SessionCardContainer
