import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import "../../styles/style.css";
import { SessionConfirm } from "./SessionConfirm";
import {
  getSessionInfo,
  getUserSessionInfo,
} from "../../actions/SessionActions";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2%",
    width: "100%",
    height: "7.5em",
    maxWidth: "30em",
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
  },
  media: {
    cursor: "pointer",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    height: "inherit",
  },
  cookieWrapper: {
    backgroundColor:"#EEAC4B",
    float: "left",
    width: "4em",
    height: "4em",
    marginLeft: "1em",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  useCookie: {
    float: "left",
    margin: "auto",
    backgroundImage: "url('/static/cookieMould.png')",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    width: "4em",
    height: "inherit",
    overflow: "hidden",
  },
  layerfordark: {
    position: "fixed",
    maxWidth: "73em",
    minHeight: "35em",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: "0.6",
    transition: "all 0.7s",
  },
}));

const style = {
  alert : {
      boxShadow: "2px 2px 2px 2px #D95032",    // 섀도우 색
      border: "solid 1px white",    // 테두리 색
      backgroundColor:"black"      // 배경색
  }
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" >
      <Box width="100%" mr={1} style={{marginLeft:"0.8em"}}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const MypageLiveSession = (props) => {
  const user = useSelector((state) => state.user.data.detail);
  const { session, setFlag } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [listup, setListUp] = useState({ transform: "translate(0, 100%)" });
  const [dark, setDark] = useState({
    transform: "translate(0, 100%)",
    display: "none",
  });
  const [open, setOpen] = useState(false);
  const [demand, setDemand] = useState(false);

  // 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
  const handleClick = () => {       
    setOpen(true);
  };

  // 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
  const handleClose = async(event, reason) => {
    await dispatch(getUserSessionInfo(localStorage.token))
    setListUp({ transform: "translate(0, 100%)" });
    setDark({ animation: "golight 0.7s" });
    setTimeout(() => {
    setDark({ display: "none" });
    }, 700);
    history.replace("/mypage");
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDemand = () => {
    setDemand(true);
  }

  const handleDemandClose = (event, reason) => {
    if (reason === 'clickaway'){
      return;
    }
    setDemand(false);
  }

  const onDelete = async () => {
    console.log("DELETE SESSION!");
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };

    const res = await axios.delete(
      "https://143.248.226.7:8000/api/hole/delete/" + session.id,
      config
    );
    // console.log("hole deleted: ", res);
    history.push("/mypage");
  };
  // console.log('session!',session)
  if (!session) return null;
  return (
    <>
      <Grid
        container
        item
        direction="row"
        justify="center"
        style={{
          width: "100%",
          maxWidth: "21em",
          float: "left",
          margin: "auto",
        }}
      >
        <Card key={session.livehole_id} className={classes.root} >
          <br></br>

          {session.host_profile_image? 
          <>
          <div
            style={{ backgroundImage: `url('https://ask2live.me${session.host_profile_image}')`}}
            className={classes.cookieWrapper}
          >
            <div className={classes.useCookie}></div>{" "}
          </div>
          </>
            :
            <div
            style={{ backgroundImage: `url('/static/reigns/1.jpg')`}}
            className={classes.cookieWrapper}
          >
            <div className={classes.useCookie}></div>{" "}
          </div>
          }
          

          <CardHeader
            style={{ padding: "0 8px 0 8px", transform: "translate(0, -5px)" }}
            title={<Typography style={{whiteSpace:"nowrap",width:"13em", overflow:"hidden", textOverflow:"ellipsis"}} variant="body2">{session.title}</Typography>}
            subheader={
                <>
                <Typography variant="body2">
                <Moment format="MM월 DD일 A h:mm">
                {session.reserve_date}
                </Moment>
                </Typography>
                </>
                }
            action={
              user.id === parseInt(session.host) &&
              session.status != "DONE" && (
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    <>
                      {history.push({
                        pathname: '/createSession',
                        search: '?holeId=' + session.id,
                      })}
                    </>;
                  }}
                >
                  <EditIcon fontSize="small"/>
                </IconButton>
              )
            }
          />
          {/* 게이지바 추가 */}
          <div style={{width: "18em"}}>
            <LinearProgressWithLabel 
            value={(session) ?
              Math.ceil(
                session.current_demand / session.target_demand <= 1 ?
                session.current_demand / session.target_demand * 100 : 100) : 0}/>
           </div>

          <CardContent style={{padding: 0, }}>
            <CardActions style={{paddingLeft: 4, paddingTop: 0}}>
              {session.status != "DONE" && user.id === parseInt(session.host) && (
                <Button
                  style={{ backgroundColor: "#3f51b5", paddingTop: 0, paddingBottom: 0 }}
                  size="normal"
                  color="primary"
                  onClick={() => {
                    console.log(session)
                    if(session.current_demand === session.target_demand){
                      setListUp({ transform: "translate(0, 50%)" });
                      setDark({ animation: "godark 0.7s" });
                    } else {
                      handleDemand();
                    }
                  }}
                >
                  {/* <Typography variant="body2" style={{ fontWeight: 600 }}> */}
                  <span className="BMJUA" style={{color: "#FFFFFF"}}>
                    예약 확정하기
                  </span>
                  {/* </Typography> */}
                </Button>
              )}
              {user.id === parseInt(session.host) && (
                <>
                <Button
                  style={{borderColor: "#3f51b5", marginLeft: "1.5em",}}
                  size="normal"
                  color="primary"
                  onClick={() => {
                    <>
                      {onDelete()}
                      {setTimeout(
                        () => dispatch(getUserSessionInfo(localStorage.token)),
                        200
                      )}
                    </>;
                  }}
                >
                  {/* <Typography variant="body2" style={{ fontWeight: 600 }}> */}
                  <span className="BMJUA" color="#3f51b5">
                    삭제하기
                  </span>
                  {/* </Typography> */}
                </Button>
                
                </>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      
      <div style={listup} className="hiddenlist" maxWidth="">
        <SessionConfirm
          session={session}
          goListUp={setListUp}
          goDark={setDark}
          handleClick={handleClick}
        />
      </div>
      <div style={dark} className="mypagelayerfordark"></div>
      <Snackbar
        style={{ position: "fixed", bottom: "50%" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} style={style.alert} severity="success">
          <span style={{ color: "white" }}>Live Q&A 생성 완료!</span>
        </Alert>
      </Snackbar>

    <Snackbar open={demand} autoHideDuration={1500} onClose={handleDemandClose}>
      <Alert style={{width: "100%", backgroundColor: "black", color: "white"}} onClose={handleDemandClose} severity="info">
        아직 목표 인원 수에<br/>
        도달하지 않았습니다.<br/><br/>
        다른 유저가 찜하는 것을<br/>
        기다려 주세요!
      </Alert>
    </Snackbar>
    </>
  );
};

export default MypageLiveSession;
