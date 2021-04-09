import React, { useCallback } from "react";
import ProfileGate from "./ProfileGate";
import MypageNav from "./MypageNav";
import { SessioinCreateButton } from "../SessionCreateButton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    top: "9%",
    backgroundColor: "#EF5941",
  },
  my: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    textAlign: "left",
    // color: theme.palette.text.secondary,
    // position: "absolute",
    backgroundColor: "#EF5941",
    width: "100%",
    height: "90%",
    // maxWidth: "43em",
    // borderRadius: "15px",
  },
  myBottomCard: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "",
  },
}));

const style = {
  logOut : {

    transform:"translate(-0.5em,  1em)",
    float:"right",
    color: "white",
    cursor:"pointer",
  }
}

const Logout = async() => {
  const headers = {
    'Authorization': 'Token ' + localStorage.token
  }
  const data = {}
  const res = await axios.post('https://www.ask2live.me/api/user/logout', data, {headers:headers})
  // window.location.replace('/')
}

const MyPage = (props) => {
  const classes = useStyles();
  console.log(props);

  return (
    <>
      <MypageNav text={"프로필"} />
    <div style={{position: "relative", height: "7vh", width:"100%", backgroundColor: "#EF5941",}}/>
      {/* <div className={classes.root}>{}</div> */}
      <Grid container justify="center" >
        <div className={classes.my}>
          <div style={{width: "100%", maxWidth: "43em", margin: "auto"}}>

            <span 
              className="BMJUA" 
              style={style.logOut}
              onClick={()=> {
                  Logout()
                  localStorage.clear()
                  window.location.replace('/')
                  }}
              >로그아웃</span>
              <ProfileGate user={props.user} />
          </div>


        </div>
      </Grid>
      <div style={{ position: "relative", top: "50%" }}>
        <SessioinCreateButton />
      </div>
      <div style={{ padding: "0 16px", margin: "auto", maxWidth: "43em" }}>
        <h3 className="CookieRun">Live QnA</h3>
      </div>
    </>
  );
};

export default MyPage;
