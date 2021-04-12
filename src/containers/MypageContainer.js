import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Mypage from "../components/mypage/Mypage";
import MypageLiveSession from "../components/mypage/MypageLiveSession";
import MypageConfirmedSession from "../components/mypage/MypageConfirmedSession";
import { getUserSessionInfo } from "../actions/SessionActions";
// import { getUserInfo } from "../actions/UserActions";
import { Emoji } from "../components/Emoji";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "100%",
    maxWidth: "70em",
    paddingLeft: theme.spacing(4),
    borderBottom: "solid thin",
    margin: "auto"
    // marginBottom: "2%",
  },
}));

const style = {

  alert: {
    position: "fixed",
    left: 0,
    right: 0,
    margin: "auto",
    zIndex: 2,
    maxWidth: "25em",
    size: "large",
  },
  itemText: {
    width: "100%",
    paddingLeft: "5%",
    transform: "translate(0, 1.5px)",
    // marginTop: "1%",
  },
};



const MyPageContainer = (props) => {
  // console.log("컴포넌트 실행!");

  // const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.user.data);
  const sessions = useSelector((state) => state.mySession.data);
  const wishSessions = useSelector((state) => state.mySession.data);

  // console.log("세션 :", sessions);

  useEffect(() => {
    const token = localStorage.token
    // dispatch(getUserInfo(token));
    dispatch(getUserSessionInfo(token));
    // setRender(true);
  }, []);

  let myLiveSessions = [];
  let myDoneSessions = [];
  let myWishSessions = [];
  let myConfirmSessions = [];

  if (Object.keys(sessions).length != 0) {
    sessions.detail.my_hole.map((session) => {
      if (
        session.status === "NOT_START" &&
        parseInt(session.host) === user.detail.id
      ) {
        if (session.reservation_status === "HOST_CONFIRMED") {
          myConfirmSessions = [...myConfirmSessions, session];
        } else {
          myLiveSessions = [...myLiveSessions, session];
        }
      } else if (
        session.status === "DONE" &&
        parseInt(session.host) === user.detail.id
      ) {
        myDoneSessions = [...myDoneSessions, session];
      }
    });
  }

  if (Object.keys(wishSessions).length != 0) {
    wishSessions.detail.wish_hole.map((session) => {
      myWishSessions = [...myWishSessions, session];
    });
  }

  const [open, setOpen] = useState(true);
  const [openDone, setOpenDone] = useState(true);
  const [openWish, setOpenWish] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmClick = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickDone = () => {
    setOpenDone(!openDone);
  };

  const handleClickWish = () => {
    setOpenWish(!openWish);
  };


  if (!user.detail || !sessions.detail) return <p>로딩중...</p>;

  return (
    <>
      <Mypage user={user} />
      {/* <SessioinCreateButton /> */}

      <Grid container justify="center" alignItems="center">
        <div
          style={{ display: "inline-block", width: "100%", maxWidth: "43em" }}
        >
          <ListItem
            button
            onClick={handleConfirmClick}
            className={classes.nested}
          >
            {/* <ListItemIcon> */}
              <Emoji symbol="🔊" />
            {/* </ListItemIcon> */}
            <p className="BMJUA" style={style.itemText} >진행 확정된 Q&A</p>
            {openConfirm ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openConfirm} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myConfirmSessions.length != 0 ?
                myConfirmSessions.map((session) => (
                  <>
                    <MypageConfirmedSession
                      session={session}
                    />
                  </>
                )) :
                  <>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <p className="Gmarket2" style={{color: "#3f51b5"}}> 진행 확정된 Q&A가 없습니다</p>
                    </div>
                  </>
                }
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClick}
            className={classes.nested}
          >
            <Emoji symbol="💬" />
            <p className="BMJUA" style={style.itemText} >모집 중인 Q&A</p>
            {open ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myLiveSessions.length != 0 ?
                myLiveSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} />
                  </>
                ))
                :
                  <>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <p className="Gmarket2" style={{color: "#3f51b5"}}> 모집 중인 Q&A가 없습니다</p>
                    </div>
                  </>
                }
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickWish}
            className={classes.nested}
          >
            <Emoji symbol="❤️" />

            <p className="BMJUA" style={style.itemText} >찜한 Q&A</p>
            {openWish ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openWish} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myWishSessions.length != 0 ?
                myWishSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} />
                  </>
                ))
                :
                <>
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <p className="Gmarket2" style={{color: "#3f51b5"}}> 찜한 Q&A가 없습니다</p>
                  </div>
                </>
              }
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickDone}
            className={classes.nested}
          >

              <Emoji symbol="🔇" />

            <p className="BMJUA" style={style.itemText} >진행 완료 Q&A</p>
            {openDone ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openDone} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myDoneSessions.length != 0 ?
                myDoneSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} />
                  </>
                ))
                :
                <>
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <p className="Gmarket2" style={{color: "#3f51b5"}}> 진행 완료한 Q&A가 없습니다</p>
                  </div>
                </>
                }
            </List>
          </Collapse>

        </div>
      </Grid>

      <div
        style={{
          height: "4em",
          width: "100%",
          marginBottom: "4%",
        }}
      />
    </>
  );
};

export default MyPageContainer;
