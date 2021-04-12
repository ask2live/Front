import getQuestionlist from "../../actions/QuestionListActions";
import { getSessionInfo } from '../../actions/SessionActions';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { Progress } from 'antd';
import React, {useState} from "react";
import Moment from "react-moment";
import axios from "axios";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import "../../styles/style.css";
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import { CardActions, Divider } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexGrow: 1,
      justifyContent : "center",
      maxWidth:"40em",
      
      "& > *": {
        margin: "0 1em 1em 1em",
        width: theme.spacing(25),
        height: theme.spacing(40)
      }
    },
    paper: {
      display:"flex",
      justifyContent:"center",
      paddingTop: "0.5em",
      // paddingBottom: "1em",
      maxWidth: "20em",
      minWidth: "17em",
      cursor:"pointer",

    },
    title: {
      width: "100%",
      display:"flex",
      justifyContent:"center",
      fontSize: "14",
      // paddingBottom: "1em"
    },
    successContent: {
      width: "80%",
      position: "relative",
      // top: "5px",
      transform: "translate(0,-2em)",
      // display: "inline-Block",
    },
    content: {
      width: "80%",
      position: "relative",
      // top: "5px",
      transform: "translate(0,-2em)",
      // display: "inline-Block",
    },
    date: {
      position: "relative",
      top: "10px",
      display: "inline-Block",
    },
    work_field: {
      fontSize:"xx-small",
      marginLeft: "1em",
    },
    wish: {
      fontSize:"x-small",
      marginLeft: "0.5em",
    },
    questions: {
      fontSize:"x-small",
      marginLeft: "0.5em",
    },
    questionIcon : {
      marginLeft: "2.5em"
    },
    avatarWrapper : {
      display: "table",
      marginLeft: "auto",
      marginRight: "auto",
      transform: "translate(0,-4.9em)",
    },
    avatar : {
      width: theme.spacing(14),
      height: theme.spacing(14),
      // opacity: 0.7,
      
    },
    check : {
      position: "absolute",
      paddingTop: "80px",
    },

    chipGrid : {
      width: "15%",
      position: "absolute",
      paddingTop: "110px"
    },

    wishButton : {
      width:"250px",
      height: "35px",
      textAlign: "center",
      backgroundColor: '#F24822',
      marginTop: '7px',
      zIndex: "1",
      transform : "translate(0,-5.5em)",
    },
    hostProfile : {
      width:"110px",
      height: "110px",
      textAlign: "center",
      borderRadius: "50%",
      marginTop: '7px',
      zIndex: "1",
      transform : "translate(0,-21.5em)",
      opacity: "0",
      cursor:"pointer",
    },

  }));

const onClickWish = (sessionId) => {
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }
  axios.patch(
    "https://143.248.226.7:8000/api/reservation/hole/" + sessionId + "/wish",
    data,
    config,
  ).then((response) => {
    console.log("onClickWish 응답 받음", response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  })
}

const onClickWishCancel = (sessionId) => {
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  axios.patch(
    "https://143.248.226.7:8000/api/reservation/hole/" + sessionId + "/wishcancel",
    data,
    config,
  ).then((response) => {
    console.log('onClickWishCacel 응답 받음', response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  });;
}

const CurrentReserveSessionsCards = ({currentReserveSessions}) => {
  console.log("컴포넌트 시작 Enter : CurrentReserveSessionsCards")


    const [open, setOpen] = useState(false);

    const handleClick = () => {       
         setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(state => state.user)
    let i = 0;
    return (
        <>
        {console.log("렌더링 시작")}
        <div className={classes.root}>
            {currentReserveSessions.map((session) => (
                <>
                {console.log(session)}
                <Paper elevation={3} className={classes.paper} onClick={() => {
                  history.push('/preQuestions/'+session.id)
                  dispatch(getQuestionlist(session.id))
                }}>
                <Grid container justify="center">
                  <Progress 
                    className={classes.progress}
                    strokeWidth="5"
                    type="dashboard"
                    strokeColor="#F24822"
                    gapDegree = "85"
                    width={140}
                    format={percent => {
                      if(percent == 100){
                        return(
                          <>
                          <div className={classes.avatarWrapper}>
                            <Avatar className={classes.avatar} src={session.host_profile_image?
                            `https://143.248.226.7:8000${session.host_profile_image}`
                            : "/static/reigns/1.jpg"} />
                            
                            {/* <CheckIcon size="large" style={{fontSize: "55", opacity: 0.6, position:"absolute", top:"25", left:"30"}} color='error'/> */}
                          </div>
                          </>
                        )
                      }else{
                        return(
                          <>
                          {/* {percent} Days */}
                          <div className={classes.avatarWrapper}>
                          <Avatar className={classes.avatar} src={session.host_profile_image?
                            `https://143.248.226.7:8000${session.host_profile_image}`
                            : "/static/reigns/1.jpg"} />
                          </div>
                          {/* <div className="NotoSans3" style={{fontSize:"large", position:"absolute", transform:"translate(1em, -3em)"}}>안녕안녕</div> */}
                          </>
                        )}
                      
                      }}
                    percent={(session.hole_reservations) ? 
                      Math.ceil(
                        session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                        session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0}/>
                          
                        {session.hole_reservations.target_demand === 0 || session.hole_reservations.guests.length / session.hole_reservations.target_demand >= 1 ?
                          <>
                          <div className={classes.commingSoon}></div>
                          </>
                          :
                          <>
                          </>
                        }
                        <Grid container className={classes.chipGrid} justify="center" alignItems="center">
                          <Chip 
                            size="small"  
                            color="default" 
                            label={<>
                          <span className="NanumGothic3">{session.hole_reservations.target_demand == 0? 
                            100 : Math.ceil(session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100)}%달성</span></>} 
                          />
                        </Grid>
                        
                        <Grid justify="flex-start" className={classes.content}>
                            <span className="BMDOHYEON" style={{color: "#1C418C", fontSize: "1.1em"}}>
                                {session.title}
                            </span>
                          <Typography variant='caption' component="div" color="textSecondary">
                            {session.host_username? session.host_username : "익명"} 
                            <span className={classes.work_field}>
                            {session.host_work_company? session.host_work_company : " "}
                            {session.host_work_field? " | "+session.host_work_field : " "}
                            </span>
                          </Typography>
                          <Grid item className={classes.date}>
                          <Typography variant='caption' component="p" >
                            <span className="fontGradi NanumGothic3" style={{fontSize: "1.2em", color: "#D95032"}}>
                              <span >{`예정일자 `}</span>
                            <Moment format="MM.DD hh:mm">
                              {session.reserve_date}
                            </Moment></span>
                          </Typography>

                          <Grid container alignItems="stretch" >
                            <div style={{color:"#F24822", paddingTop:"0.4em"}}><FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon></div>
                            <p className={classes.wish} >
                            <span className="NanumGothic3">찜 {session.hole_reservations.guests.length}/{session.hole_reservations.target_demand}</span>
                            </p>
                            <div className={classes.questionIcon} style={{color:"#F24822", paddingTop:"0.5em"}}><CommentIcon fontSize="small"></CommentIcon></div>
                            <p className={classes.questions}>
                            <span className="NanumGothic3">질문 {session.count_questions}개</span>
                            </p>
                          </Grid>
                        </Grid> 
                        </Grid>
                        </Grid>
                </Paper>

                <Grid style={{width:"100%", margin: "auto", height: "1em", display: "flex", justifyContent: "center",}}>       
                <Button 
                className={classes.wishButton}
                variant="contained"
                color="primary"
                clickable='true' 
                startIcon={<FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>}
                onClick={() => {
                  if(Object.keys(user.data).length === 0){
                    alert('로그인이 필요합니다.')
                  }else{
                    session.hole_reservations.guests.indexOf(user.data.detail.id) === -1 ?
                  <>
                  {onClickWish(session.id)}
                  {handleClick()}
                  {setTimeout((()=> dispatch(getSessionInfo())),200)}
                  </>
                  : 
                  <>
                  {onClickWishCancel(session.id)}
                  {setTimeout((()=> dispatch(getSessionInfo())),200)}
                  </>}
                  }
                  }
                  >{Object.keys(user.data).length != 0 && session.hole_reservations.guests.indexOf(user.data.detail.id) != -1 ? "취소하기" : "찜하기"}</Button>
                  </Grid> 
                  <Grid style={{width:"100%", margin: "auto", height: "1em", display: "flex", justifyContent: "center",}}>  
                  <div className={classes.hostProfile} onClick={() => {
                    history.push({
                      pathname: '/mypage/' + session.host_username,
                      state:{host : session}})
                  }}>
                  
                  </div>
                  </Grid>
                  
            </>
            ))
            }
        </div>
        <Snackbar 
                style={{position:"fixed", top: "0%"}}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert 
                    style={{color: "black", backgroundColor:"white", border:"2px solid #4CC0D0", boxShadow:"2px 2px 15px 10px rgba(0, 0, 0, 0.6)"}}
                    onClose={handleClose} severity="error">
                    <span className="BMJUA">라이브가 열리면 알려줄게요! </span>
                    </Alert>
        </Snackbar>
        </>
    );
}

export default CurrentReserveSessionsCards;