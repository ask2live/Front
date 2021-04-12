import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PreQuestionNav from './PreQuestionNav'
import MypageNav from '../mypage/MypageNav'
import getQuestionlist from "../../actions/QuestionListActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Box from "@material-ui/core/Box";

import { Progress, Badge, Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Moment from "react-moment";
import "../../styles/style.css";
import "../../App.css";
import { QUESTIONLIST_DELETE } from "../../actions/types";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      maxWidth: "70em",
      minWidth: "18em"
    },
    paper: {
      padding: theme.spacing(2),
    },
    avatar : {
      width: theme.spacing(10.5),
      height: theme.spacing(10.5),
      transform: "translate(0.4em,-4.85em)"
      // opacity: 0.7,
    },
    title : {
      paddingLeft: "1em",
      fontFamily: "BMJUA",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1.8em",
      paddingTop: "0.8em",
      paddingBottom: "1em",
    },
    time : {
      paddingLeft: "1em",
      paddingBottom: "1em",
      fontFamily: "BMJUA",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1em",
    },
    desc : {
      display: "flex",
      flexDirection: 'column',
      paddingLeft: "1em",
      paddingBottom: "1em",
      fontFamily: "BMJUA",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1em",
    },
    progress : {
      transform: "translate(-1em,1em)"
    }

  }));



const SessionDetail = ({session}) => {
  const history = useHistory();
    const classes = useStyles();

    if(session === undefined){
      return(
        <>
        로딩중
        </>
      )
    }
    return(
        <>
        <Grid container spacing={0}>
        <Grid item xs={8}>
        <p className={classes.title}>{session.title}</p>
        </Grid>
        <Grid item xs={4}>
        <Progress 
          className={classes.progress}
          strokeWidth="5"
          type="dashboard"
          strokeColor="#F24822"
          gapDegree = "85"
          width={100}
          format={percent => {
            // 여기 수정 필요
            if(percent == 100){
              return(
                <>
                {session.host_profile_image?
                <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
              :
                <Avatar className={classes.avatar} src="/static/reigns/1.jpg" />
              }
                  
                </>
              )
            }else{
              return(
                <>
                  {session.host_profile_image?
                <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
              :
                <Avatar className={classes.avatar} src="static/reigns/1.jpg" />
              }
                </>
              )}
            
            }}
          percent={(session.hole_reservations) ? 
                  Math.ceil(
                    session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                    session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0}/>
        </Grid>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <div className={classes.time}>라이브 예정 일자 : {``}
            <Moment format="MM월 DD일 A h:mm">
                  {session.reserve_date}
            </Moment></div>


          <div className={classes.desc}>라이브 주제 : {``} {session.description}</div>

        </Grid>
        </Grid>
        </>
    )
}

const ListPreQuestions = ({questions, session}) => {
    // console.log('qestions', questions)
    return(
        <>
        <PreQuestionNav session={session}/>
        
        </>
    )
}

const PreQuestions = () => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionlist)
    // console.log(questions)
    const sessions = useSelector(state => state.session.data)
    let targetSession = {};

    const href = window.location.href
    const sessionId = parseInt(href.split('/')[4])

    if(Object.keys(sessions).length != 0){
        sessions.map((session) => {
          // console.log('DEBUG22',session)
            if(sessionId === session.id){
                targetSession = {...targetSession, session}
            }
        })
      }
    // useEffect(() => {
    //   console.log(questions.data)
    //   if(questions.data.length === 0){
    //     console.log("dispatch!!!")
        // dispatch(getQuestionlist(sessionId))
      // }
    // })
    
    return (
            <>
        <MypageNav text={'Live Q&A 질문방'} />
        {/* <div style={{position : "absolute", height:"12em", width: "100%", backgroundColor:"skyblue"}}>{""}</div> */}
        <div style={{display:"flex", justifyContent:"center", position:"absolute", top:"9%" , width:"100%"}}>
          <div style={{width:"100%", maxWidth:"50em"}}>
          <SessionDetail session={targetSession.session}/>
          <ListPreQuestions questions={questions} session={targetSession.session}/>
          </div>
        </div>
        </>
    )
  
}
export default PreQuestions;