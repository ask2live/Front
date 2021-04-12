import { postSessionToReserve } from '../../actions/SessionToReserveActions';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import { getUserSessionInfo } from '../../actions/SessionActions'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const style = {
  paper: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "20px 20px 0 0 ",
    zIndex : "3",
  },
  title: {
    color: "#030916",
    fontSize: "1.2em",
    margin: "5% 0 1% 5%",
  },
  font: {
    color: "#030916",
    fontSize: "1.2em",
    margin: "5% 0 1% 5%",
  },
  font2: {
    color: "#030916",
    fontSize: "1em",
    margin: "5% 0 1% 5%",
  },
  font3: {
    fontSize: "1em%",
  },
  button: {
    position: "relative",
    width: "40%",
    margin: "3% 5% 0 0",
  },
};

const SessionConfirm = (props) => {
  // console.log("SessionConfirm");
  const { session, goListUp, goDark, handleClick } = props;
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <>
    <Paper style={style.paper} elevation={1}>
      <div className="BMDOHYEON" style={style.title}>
        {/* <Typography variant="h3"  gutterBottom> */}
        오픈 확정하기
        {/* </Typography> */}
      </div>
      <div className="BMJUA" style={style.font}>
        {Date(session.reserve_date).substring(0, 21)}에 예정된 <br></br>"
        {session.title}"의 스케쥴을 확정하시겠어요?
      </div>
      <div className="BMJUA" style={style.font2}>
        스케줄을 확정하면 '찜하기' 버튼을 누른 유저에게
        <br></br>
        알림이 전송됩니다!
      </div>
      <div className={classes.root}>
        <Grid container justify="center">
          <Button
            style={style.button}
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              goListUp({ transform: "translate(0, 100%)" });
              goDark({ animation: "golight 0.7s" });
              setTimeout(() => {
                goDark({ display: "none" });
              }, 700);
            }}
          >
            <div style={style.font3} color="030916">
              취소하기
            </div>
          </Button>

          <Button
            style={style.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => 
              {
                postSessionToReserve(session);
                handleClick();
              }}
              >
            <div style={style.font3} color="030916">
              확정하기
            </div>
          </Button>
        </Grid>
      </div>
    </Paper>
    </>
  );
};

export { SessionConfirm };
