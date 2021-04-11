import React, { useState, useCallback, useEffect } from "react";
import { postSessionToReserve } from '../actions/SessionToReserveActions';

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import HelpIcon from '@material-ui/icons/HelpOutline';
import { Checkbox } from 'antd';

import axios from "axios";
import { getSessionInfo, getUserSessionInfo } from "../actions/SessionActions";
import MypageNav from "../components/mypage/MypageNav";

import MuiAlert from '@material-ui/lab/Alert';
function NumAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    // fontFamily: "BMJUA"
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#EF4D57",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontSize: '0.8em'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#EF4D57",
    borderRadius: "10px",
    boxShadow: "1px 1px 2px 2px black",
    color: "#FFFFFF",
  },
}));

const style = {
  alert : {
    color: "white",
    backgroundColor:"black",
    border:"2px solid #4CC0D0",
    boxShadow:"2px 2px 15px 10px rgba(0, 0, 0, 0.6)"
  }
}

const SessionCreateContainer = (props) => {

  let urlSearchParams = new URLSearchParams(
    props.routerInfo.location.search.slice(1)
  );

  let defaultDate = new Date().toISOString()
  console.log("defaultDate", defaultDate)

  const holeId = urlSearchParams.get("holeId");

  const [title, setTitle] = useState("");
  const [titleValid, setTitleValid] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(false);
  
  const [reserveDate, setReserveDate] = useState(defaultDate);
  const [reserveDateValid, setReserveDateValid] = useState(false);
  const [earlyDateValid, setEarlyDateValid] = useState(false);
  const [count, setCount] = useState(0)

  const [skipValid, setSkipValid] = useState(false);

  const toDate = (reserve_date) => {
    let date = new Date(reserve_date);
    return date;
  };

  useEffect(() => {
    if (holeId) {
      axios
        .get("https://www.ask2live.me/api/hole/read/" + holeId)
        .then((res) => {
          const session = res.data.detail;
          console.log(session)
          setTitle(session.title);
          setDescription(session.description);
          let date = session.reserve_date.split(":");
          setReserveDate(date[0] + ":" + date[1]);
          setCount(session.hole_reservations.target_demand);
        });
    }
  }, [holeId]);

  const [open, setOpen] = useState(0);
  const [open2, setOpen2] = useState(0);
  const [disable, setDisable] = useState(false)

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => count > 0 ? setCount(count - 1) : null;

  // 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
  const handleClick = () => {
    setOpen(true);
  };

  // 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
  const handleClose = (event, reason) => {
    history.push("/mypage");
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };

  const onClick = async () => {
    if (earlyDateValid)
        return;
    setDisable(true)
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };
    console.log(localStorage.token);
    
    let session = {}
    
    const data = {
      title: title,
      description: description,
      reserve_date: reserveDate,
      target_demand: count,
    };
    console.log(data);
    if (holeId) {
      await axios
        .patch(
          "https://www.ask2live.me/api/hole/update/" + holeId,
          data,
          config
        )
        .then((res) => {
          console.log("hole created: ", res);
          handleClick();
          setTimeout(() => {
            dispatch(getUserSessionInfo(localStorage.token));
            dispatch(getSessionInfo());
          }, 200);
        })
        .catch((err) => {
          if (title.length === 0) setTitleValid(true);
          if (reserveDate.length === 0) setReserveDateValid(true);
          if (description.length === 0) setDescriptionValid(true);
          setDisable(false)
        });
    } else if(skipValid){
      // sessionCreate
      await axios
      .post("https://www.ask2live.me/api/hole/create", data, config)
        .then((res) => {
          console.log("hole created: ", res);
          session = res.data.detail
        })
      // sessionToReserve
      postSessionToReserve(session);
      console.log("postSessionToReserve success")
      // 라이브 하기
      history.push({
        pathname: "/session/reserve",
        search: "?holeId=" + session.id,
    })
      
    }else {
      await axios
        .post("https://www.ask2live.me/api/hole/create", data, config)
        .then((res) => {
          console.log("hole created: ", res);
          handleClick();
          setTimeout(() => {
            dispatch(getUserSessionInfo(localStorage.token));
            dispatch(getSessionInfo());
          }, 200);
        })
        .catch((err) => {
          if (title.length === 0) setTitleValid(true);
          if (reserveDate.length === 0) setReserveDateValid(true);
          if (description.length === 0) setDescriptionValid(true);
          setDisable(false)
        });
    }
  };

  return (
    <>
      {holeId ? (
        <MypageNav text={"Live Q&A 수정하기"} />
      ) : (
        <MypageNav text={"Live Q&A 만들기"} />
      )}
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="body1"
            butterBottom
            style={{ fontFamily: "BMJUA" }}
          >
            세션 정보를 입력하세요
          </Typography>
          {/* <Typography variant="subtitle1" gutterBottom>
                    세션 정보를 입력하세요
                </Typography> */}
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="session title"
              name="title"
              error={titleValid}
              helperText={titleValid ? "제목을 입력해 주세요" : ""}
              // autoComplete="title"
              placeholder="세션 제목을 입력해주세요"
              autoFocus
              value={title}
              onChange={(e) => {
                if (e.target.value.length > 20)
                  alert("제목은 20자 이내로 입력이 가능합니다!");
                setTitle(e.target.value.substring(0, 20));
                setTitleValid(false);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <Checkbox onChange={(e) => {
              console.log("e.target.checked", e.target.checked)
              if(e.target.checked){
                setSkipValid(true)
                console.log("skipValid-true", skipValid)
              }else{
                setSkipValid(false)
                console.log("skipValid-false", skipValid)
              }
            }}><span style={{fontSize:"small"}} className="BMDOHYEON">지금 당장 라이브 세션 열기</span></Checkbox>
            
            {skipValid ? 
            
            <>
                <TextField
                margin="normal"
                disabled="true"
                fullWidth
                id="reserveDate"
                label="Live Q&A 진행 예정일"
                name="reserveDate"
                type="datetime-local"
                autoFocus
                value={reserveDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Grid
              style={{ height: "6em" }}
              container
              spacing={3}
              justify="flex-end"
            >
              <Grid justify="center" justifyContents="center" item xs={6}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    float: "right",
                    fontFamily: "BMJUA",
                  }}
                  variant="body2"
                >
                  <HelpIcon
                    color="disabled"
                    onClick={()=>
                        handleClick2()
                    }
                  /><span style={{color:"gray"}}> &nbsp; 목표 인원 수</span>
                </div>
              </Grid>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1em",
                }}
              >
                <IconButton disabled="true" size="small" onClick={onDecrease}>
                  <RemoveCircleIcon />
                </IconButton>

                <TextField
                disabled="true"
                  // margin="normal"
                  style={{ width: "4em" }}
                  id="target_demand"
                  name="target_demand"
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  value={count}
                  name="userCount"
                />

                <IconButton disabled="true" size="small" onClick={onIncrease}>
                  <AddCircleIcon />
                </IconButton>
              </div>
            </Grid>
              </>
              
            :
            <>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                error={reserveDateValid || earlyDateValid}
                helperText={reserveDateValid ? "예약 일자를 입력해 주세요" : 
                              earlyDateValid ? "이전 날짜로는 입력할 수 없어요" : ""}
                id="reserveDate"
                label="Live Q&A 진행 예정일"
                name="reserveDate"
                type="datetime-local"
                // autoComplete="title"
                autoFocus
                value={reserveDate}
                // defaultValue={reserveDate}
                onChange={(e) => {
                  setReserveDate(e.target.value);
                  let cur_date = new Date();
                  console.log(reserveDate);
                  console.log("설정한시간", toDate(e.target.value).getTime());
                  console.log("현재시간", cur_date.getTime());
                  console.log(
                    (toDate(e.target.value).getTime() - cur_date.getTime()) / 1000
                  );
                  if (toDate(e.target.value).getTime() - cur_date.getTime() < 0)
                      setEarlyDateValid(true)
                  else
                      setEarlyDateValid(false)
                  setReserveDateValid(false);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Grid
              disabled="true"
              style={{ height: "6em" }}
              container
              spacing={3}
              justify="flex-end"
            >
              <Grid justify="center" justifyContents="center" item xs={6}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    float: "right",
                    fontFamily: "BMJUA",
                  }}
                  variant="body2"
                >
                  <HelpIcon
                    onClick={()=>
                        handleClick2()
                    }
                  /> &nbsp; 목표 인원 수
                </div>
              </Grid>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1em",
                }}
              >
                <IconButton size="small" onClick={onDecrease}>
                  <RemoveCircleIcon />
                </IconButton>

                <TextField
                  // margin="normal"
                  style={{ width: "4em" }}
                  id="target_demand"
                  name="target_demand"
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  value={count}
                  name="userCount"
                />

                <IconButton size="small" onClick={onIncrease}>
                  <AddCircleIcon />
                </IconButton>
              </div>
            </Grid>
              </>
            }
            
            
            

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              placeholder="소개글을 입력해주세요"
              error={descriptionValid}
              helperText={
                descriptionValid ? "어떤 내용의 Q&A인지 설명해 주세요" : ""
              }
              value={description}
              label="Live Q&A 짧은 소개"
              type="password"
              id="description"
              onChange={(e) => {
                if (e.target.value.length > 200)
                  alert("소개는 200자 이내로 입력이 가능합니다!");
                setDescription(e.target.value.substring(0, 200));
                setDescriptionValid(false);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {holeId ? 
            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={onClick}
                disabled={disable}
              >
                수정하기
              </Button>
            </>
             : 
            <>
            {skipValid?
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onClick}
            disabled={disable}
          >
            Live Q&A 세션 바로 만들기
            </Button>
            :
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onClick}
            disabled={disable}
          >
            Live Q&A 만들기
            </Button>
            }
              
            </>
            }
          </div>
        </div>
      </Container>
      <Snackbar
        style={{ position: "fixed", bottom: "50%" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} style={style.alert} severity="success">
          {holeId ? (
            <span className="BMJUA">Live Q&A 수정 완료!</span>
          ) : (
            <span className="BMJUA">Live Q&A 생성 완료!</span>
          )}
        </Alert>
      </Snackbar>
      <Snackbar 
                style={{position:"fixed", top: "0%"}}
                open={open2} autoHideDuration={6000} onClose={handleClose2}>
                    <NumAlert 
                    style={{color: "black", backgroundColor:"white", border:"2px solid #4CC0D0", boxShadow:"2px 2px 15px 10px rgba(0, 0, 0, 0.6)"}}
                    onClose={handleClose2} severity="error">
                    <span style={{fontSize:"1.1em"}} className="BMJUA">목표인원</span> 
                    을 달성하면 <br/>
                    <span style={{fontSize:"1.1em"}} className="BMJUA">예약 확정하기</span>
                    를 할 수 있어요.<br/>
                    예약을 확정하면
                    <span style={{fontSize:"0.9em"}} className="Gmarket3"> Live Q&A</span>
                    를 열 수 있어요.
                    </NumAlert>
        </Snackbar>
    </>
  );
};

export default SessionCreateContainer;
