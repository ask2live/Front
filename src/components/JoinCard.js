import React, {useState} from 'react';
import {useHistory, withRouter} from "react-router-dom"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CardContent from '@material-ui/core/CardContent';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width : "94%",
    maxWidth: "23em",
    height: "11em"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    paddingTop: 0,
},
cover: {
    width: "20px",
    borderLeft: "solid rgba(0, 0, 0, 0.3) 1px"
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  top : {
      position : "fixed",
      top: "30%"
  }
}));

const style = {
  loginCard : {
      top : "20%",
      // backgroundColor: "skyblue",
      border: "1px solid black",
      borderRadius: "15px",
      boxShadow: "1px 1px 2px 2px black",
      paddingTop: "1em",
      paddingBottom: "1em",
      maxWidth : "23em",
      width : "16em",
      height : "10.5em",
      position : "fixed",
  },
  loginBtnWrapper : {
      position: "absolute",
      top : "88%",
      backgroundColor: "black",
      borderRadius: "15px",
      color: "white",
  },
  mikeBtn : {
    height: '2.5em',
    width: '4em',
    backgroundColor: "black",
    boxShadow: "1px 1px 1px 1px black",
    borderColor: "white",
    borderRadius: "15px",
    color: "white",
  },
  loginBtn : {
      height: '2.5em',
      width: '4em',
      backgroundColor: "#EF5941",
      boxShadow: "1px 1px 1px 1px black",
      borderColor: "#EF5941",
      borderRadius: "15px",
      color: "white",
  },
  liveBtn : {
    height: '2.5em',
    width: '7em',
    backgroundColor: "#EF5941",
    boxShadow: "1px 1px 2px 2px black",
    borderColor: "#EF5941",
    borderRadius: "15px",
    color: "white",
},
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const JoinCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [mike, setMike] = useState(0);
  const [open, setOpen] = useState(false);

  const getMike = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        // console.log('You let me use your mic!')
        setMike(1);
      })
      .catch(function(err) {
        handleOpen();
      });
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return;
    }
    setOpen(false);
  }

  return (
    <>
    
<Grid className={classes.top} container justify="center">
    <Card style={style.loginCard}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.hostName}
          </Typography>
          {props.isHost ?  
          <p className="NanumGothic3">
            [{props.hostName}]님의<br/>Live Q&A를 시작합니다
            {mike? <p>마이크 설정 완료</p> : <><p>마이크를 허용해주세요.</p>
            <button style={style.mikeBtn} onClick={getMike}>허용</button></>}
          </p>    
            :
          <p className="NanumGothic3">
            [{props.hostName}]님의<br/>Live Q&A에 입장합니다
            {mike? <p>마이크 설정 완료</p> : <><p>마이크를 허용해주세요.</p>
            <button style={style.mikeBtn} onClick={getMike}>허용</button></>}
          </p>
            }
        <div>
          {/* {console.log(props.isHost)} */}
            {props.isHost ?
                mike?
                    <button 
                    onClick={()=>{
                        history.push({
                            pathname : "/session/live",
                            search: "?holeId=" + props.holeId + "&channelNum=" + props.channelNum,
                            state : {
                                joinPass : true,
                                isHost : true,
                                hostName : props.hostName,
                                hostImage: props.hostImage,
                            }
                        })
                    }}
                    // style={{margin:"0 0 1em 2em"}}
                    style={style.liveBtn}
                    >라이브열기</button>
                :
                <></>
            :   
                mike?
                <button 
                style={style.loginBtn}
                onClick={()=>props.setJoin(1)} aria-label="play/pause">
                    입장
                </button>
                :
                <></>
            }
        </div>
        </CardContent>
      </div>
    </Card>

</Grid>
  <Snackbar style={{top: "40%"}} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert style={{width: "90%"}} onClose={handleClose} severity="warning">
        [마이크 권한]이 차단되었습니다<br/><br/>
        브라우저 상단에서<br/>
        [마이크 권한]을 허용해주세요!
      </Alert>
  </Snackbar>
</>
  );
}

export default withRouter(JoinCard)