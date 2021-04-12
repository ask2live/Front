import { useHistory } from "react-router"
import React, {useMemo, useState} from 'react';
import Moment from "react-moment";

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import PeopleIcon from '@material-ui/icons/People';
import EnterIcon from '@material-ui/icons/MeetingRoom';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Snackbar from '@material-ui/core/Snackbar';

import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import { useSelector } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "17em",
    borderBottom : "0.4px solid #3B568C",
    padding :"0px",
    borderRadius: "15px",
    boxShadow: "0 3px 5px 1px #3B568C",
    backgroundColor : "rgba(255,255,255,1)",
    cursor : "pointer"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    width: "100%",
    display:"flex",
    justifyContent:"center",
    paddingBottom: "1em",
    
  },
  pos: {
    marginBottom: 12,
  },
  cursor: {
      cursor: "pointer"
  },
  padding : {
    padding: "2%",
  },
  avatarRoot: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border : "1px solid rgba(0,0,0,0.3)",
  },

}));

const style = {
    imageWrapper : {
        display : "inline-block",
        width : "6em",
        height : "10em",
        // backgroundColor : "skyblue",
    },
    content : {
        display : "inline-block",
        float : "right",
        width : "9em",
        height : "10em",
        paddingRight: "5px",
        // backgroundColor : "skyblue",
    },
    contentTime: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "8px",
        width : "inherit",
        height : "1.5em",
        // backgroundColor : "coral",
    },
    contentTitle: {
        width : "9em",
        height : "4em",
        textOverflow: "ellipsis",
        // backgroundColor : "grey",
        margin: "4px 0px 6px 0px",
    },
    contentName: {
        width : "inherit",
        height : "1.5em",
        marginBottom : "3px",
        // backgroundColor : "yellow",
    },
    contentField: {
        width : "inherit",
        height : "1.5em",
        // backgroundColor : "green",
        textOverflow:"ellipsis",
        whiteSpace: "nowrap",
        overflow:"hidden",
    },
    buttonWrapper : {
        width : "6em",
        height : "4em",
        // backgroundColor : "pink",
        overflow: "auto",
    },
    profileimage : {
        width : "5em",
        height : "5em",
    },
    livelogo1: {
        backgroundImage : "url('/static/Live_1.png')",
        backgroundSize : "contain",
        width : "40px",
        height: "25px",
        transform: "translate(2.1em, -1.6em)",
        zIndex : "3",
    },
    livelogo1_back: {
        backgroundColor: "white",
        backgroundSize : "contain",
        width : "22px",
        height: "12px",
        transform: "translate(2.7em, -0.5em)",
        zIndex : "0",
    }
}

const OtherLiveSessionsCards = ({otherLiveSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("제목");
    const [subtitle, setSubtitle] = useState("제목");
  
    const handleClick = () => {       
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let now = new Date();

    const toDate = (reserve_date) => {
        let date = new Date(reserve_date);
        return date;
    } 


    return (
      <>
        {otherLiveSessions.map((session) => 
        <>
        <div className={classes.padding}>
            <Card 
            key={session.livehole_id} 
            className={classes.root}
            >
                <CardContent 
                onClick={()=>{
                    if(Object.keys(user.data).length === 0){
                    alert('로그인이 필요합니다.')
                    }else{
                    history.push({
                        pathname: "/session/live",
                        search: "?holeId=" + session.id + "&channelNum=" + session.livehole_id,
                        state : {
                            hostName : session.host_username,
                            hostImage : session.host_profile_image,
                        }
                })
                }}}
                style={{padding : "5px 5px 20px 5px", backgroundColor : "rgba(255,255,255,0)"}}>
                <div style={style.imageWrapper}>
                    <div style={style.profileimage}>
                        <div className={classes.avatarRoot}>
                        <Avatar alt="Remy Sharp" style={{transform:"translate(5px, 8px)"}} className={classes.large} src={session.host_profile_image?
                            `https://www.ask2live.me${session.host_profile_image}`
                            : "/static/reigns/1.jpg"} />
                            
                        </div>
                        <div style={style.livelogo1_back}/>
                        <div style={style.livelogo1}/>
                    </div>

                </div>
                <div style={style.content}>
                    <div style={style.contentTime}>
                        <PeopleIcon style={{marginRight : "3px", padding:"0px"}} fontSize="small"/>
                        <span
                        className="NanumGothic3"
                        style={{marginRight: "2px", fontSize: "13px", color: "black"}}>
                            {session.count_participant}명
                        </span>
                        <span 
                        className="fontGradi NanumGothic3"
                        style={{fontSize: "0.7em", color: "#D95032"}}>
                        <Moment format=" · mm분 전 시작">
                            {now - toDate(session.reserve_date)}
                        </Moment>
                        </span>
                    </div>
                    <div style={style.contentTitle}>
                        <div className="contentTitle">
                            <span className="BMDOHYEON" style={{color: "#1C418C", fontSize: "1.1em"}}>
                                {/* {session.title.indexOf(" ") > 7 ? 
                                session.title.splice(7, 0, " ")
                                :
                                null                            
                                } */}
                                {session.title}
                            </span>
                        </div>
                    </div>
                    <div style={style.contentName}>
                        <span className= "NanumGothic3" style={{fontSize : "0.8em"}}>
                            {session.host_username}
                        </span>
                    </div>
                    <div style={style.contentField}>
                        <span className= "NanumGothic3" style={{color: "rgba(0, 0, 0, 0.5)", fontSize : "0.8em"}}>
                            {session.host_work_company ? 
                            <>
                             {session.host_work_company}
                            </>
                             : null}
                            {session.host_work_field ? 
                            <>
                             {" | " + session.host_work_field}
                            </>
                             : null}
                             {
                                !session.host_work_company && !session.host_work_field ?
                                <>ASK2LIVE | Live Q&A</>
                                :
                                <></>
                             }
                        </span>
                    </div>
                </div>
               
                
                </CardContent>
                    <div 
                    style={{position: "absolute", transform:"translate(2.8em, -3.5em)"}}>
             
                        <HelpIcon 
                        onClick={()=>{
                            setTitle(session.title);
                            setSubtitle(session.description);
                            handleClick();
                        }}
                        style={{color: "rgba(255,255,255,0.9)", borderRadius: "100%", padding : "2px", backgroundColor: "#1C418C" }}/>


                
                    </div>
            </Card>
  
   
        </div>
        <br/>
        </>
        )}
        <br/>
        <Snackbar 
                style={{position:"fixed", top: "0%"}}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert 
                    style={{color: "black", backgroundColor:"white", border:"2px solid #4CC0D0", boxShadow:"2px 2px 15px 10px rgba(0, 0, 0, 0.6)"}}
                    onClose={handleClose} severity="error">
                    <span className="BMJUA">제목 :</span> {title} <br/>
                    <span className="BMJUA">설명 :</span> {subtitle}
                    </Alert>
        </Snackbar>
      </>
    );
}

export default OtherLiveSessionsCards;
