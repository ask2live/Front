import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";



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
    height: "6.8em",
    maxWidth: "30em",
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
    border: 'solid',
    borderColor: '#D95032',
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

const MypageConfirmedSession = ({ session }) => {
  const user = useSelector((state) => state.user.data.detail);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [listup, setListUp] = useState({ transform: "translate(0, 100%)" });
  const [dark, setDark] = useState({
    transform: "translate(0, 100%)",
    display: "none",
  });

  const onChangeDoing = async(session, user) => {
    console.log("ChangeDoing")
    console.log(session.id)
    console.log(user)
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };
    const data = {
      
      channel_num : String(session.id) + '123',
      host_uid : user.id,
      
    }
    const res = await axios.post(
      "https://143.248.226.7:8000/api/hole/" + session.id + "/live/create",
      data,
      config,
    );

  }

  const onDelete = async () => {
    console.log("DELETE SESSION!");
    // await postSessionDelete(session);
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };

    const res = await axios.delete(
      "https://143.248.226.7:8000/api/hole/delete/" + session.id,
      config
    );
    console.log("hole deleted: ", res);
    history.push("/mypage");
  };

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
        <Card key={session.livehole_id} className={classes.root}>
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
            title={<Typography style={{whiteSpace:"nowrap",width:"13em", overflow:"hidden", textOverflow:"ellipsis"}}variant="body2">{session.title}</Typography>}
            subheader={
                <>
                <Typography variant="body2">
                <Moment format="MM.DD hh시 mm분">
                {session.reserve_date}
                </Moment>
                </Typography>
                </>}
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
          <CardContent style={{padding:0}}>
            <CardActions style={{paddingLeft: 4, paddingTop: 0}}>
              {user.id === parseInt(session.host) && (
                <>
                <Button
                  style={{ backgroundColor: "#3f51b5", paddingTop: 0, paddingBottom: 0 }}
                  size="normal"
                  color="primary"
                  onClick={() => {
                    history.push({
                        pathname: "/session/reserve",
                        search: "?holeId=" + session.id,
                    })
                  }}
                >
                  <span className="BMJUA" style={{color: "#FFFFFF"}}>
                    라이브하기
                  </span>
                </Button>
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
                  <span className="BMJUA" color="#3f51b5">
                    삭제하기
                  </span>
                </Button>
                </>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default MypageConfirmedSession;