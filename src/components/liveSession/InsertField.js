import React, {useEffect, useState, memo} from 'react';
import { useDispatch } from "react-redux";
import QuestionList from "./QuestionList";
import getQuestionList from "../../actions/QuestionListActions";
import getEnteredSession from "../../actions/EnteredSessionActions";

import ParticipantsButton from '@material-ui/icons/Group';
import Paper from '@material-ui/core/Paper';
import QuestionListButton from '@material-ui/icons/FormatListBulleted';
import QuestionButton from '@material-ui/icons/ContactSupport';
import DirectionsIcon from '@material-ui/icons/Directions';
import IconButton from '@material-ui/core/IconButton';
import { SportsRugbySharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "#3B3B3B",
    boxShadow: "none",
    width: "100%",
    height: "2.5em",
    borderRadius: "15px",
  },
  root2: {
    padding: '0 0 0 10px',
    margin : "0",
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    boxShadow: "none",
    Width : "6em",
    height: "2.5em",
  },
  input: {
    marginLeft: theme.spacing(1),
    // backgroundColor: "#D95032",
    color: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "#3B3B3B",
    flex: 1,
  },
  divider: {
    height: 35,
    margin: 4,
  },

}));

const style = {
    questioningBtn : {
        width: "1.8em",
        height:"1.8em",
        marginRight:"5px", 
        backgroundImage:"url('/static/questionPlus.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      },
    questionListBtn : {
        width: "1.8em",
        height:"1.8em",
        backgroundImage:"url('/static/questionList.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    participantBtn : {
        width: "1.8em",
        height:"1.8em",
        backgroundImage:"url('/static/participant.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
}

const CustomizedInputBase = memo((props) => {

    const dispatch = useDispatch();
   const classes = useStyles();

  const pressEnter = (e, length) => {
      if (e.key == 'Enter'){
          if (length >= 1)
          props.goMessageSend();
      }
  }
  return (
      <>
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="내용 입력하기"
        value={props.message}
        onChange={(e) =>
          {
            if(e.target.value.length > 100)
              alert('100자 이내로 입력이 가능합니다')
            props.goSetMessage(e.target.value.substring(0, 100))}
          }
        onKeyPress={(e) => {pressEnter(e, props.message.length)}}
      />
        <IconButton onClick={()=>{
            if(props.message.length >= 1)
                props.goMessageSend() 
        }} 
            aria-label="send">
        <SendIcon style={{color:"white"}}/>
      </IconButton>
    </Paper>
    <Paper className={classes.root2}>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      {props.isHost?
        <IconButton
        style={style.participantBtn}
        aria-label="participants" 
        onClick={()=>{dispatch(getEnteredSession(props.channelNum)); props.goUserUp(); props.goDark({display: "block", animation: "godark 0.7s"})}}>
        </IconButton>
      :
      <IconButton 
      onClick={()=>{props.goQueUp(); props.goDark({display: "block", animation: "godark 0.7s"})}} className={classes.iconButton} aria-label="question"
      style={style.questioningBtn}
      >
        {/* <QuestionButton/> */}
      </IconButton>
      }
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      <IconButton 
      style={style.questionListBtn}
      onClick={()=>{console.log("press button"); props.goListUp(); props.goDark({display: "block", animation: "godark 0.7s"})}} className={classes.iconButton2} aria-label="question_list">
        {/* <QuestionListButton/> */}
      </IconButton>
    </Paper>
    </>
  );
})

export default CustomizedInputBase;