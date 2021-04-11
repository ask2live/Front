import { useHistory } from "react-router";
import React from "react";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: "70em",
  },
  profile: {
    flexGrow: 1,
    maxWidth: "43em",
    display: "flex",
    height: 80,
    alignItems: "center",
    elevation: 3,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "",
  },
}));


const ProfileGate = (props) => {
  // if(!props.location.state) history.push('/mypge');
    // console.log("profileGate", props.user.detail);
    const classes = useStyles();
    const history = useHistory();

    const goToDetail = () => {
        history.push({
          pathname: '/mypage/' + props.user.detail.username,
          state: props.user.detail});
    }

  return (
    <>
      <div style={{margin: "auto", maxWidth: "43em"}}>
        <h2 className="CookieRun" style={{color: "#FFFFFF"}}>My Page</h2>
      </div>
      <Grid container justify="center">
        <Card className={classes.profile}>
          <CardActionArea onClick={goToDetail}>
            {props.user.detail.profile_image?
              <CardHeader
              fontSize="large"
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={`https://www.ask2live.me${props.user.detail.profile_image}`}
                  // className={classes.avatar}
                  className={classes.large}
                ></Avatar>
              }
              // titleTypographyProps={{variant:'h1' }}
              title={<p className="BMDOHYEON" style={{ fontSize: "1.2em", transform: "translate(0, 1.5px)"}}>{props.user.detail.username}</p>}
              // subheader="September 14, 2016"
              />
            :
              <CardHeader
              fontSize="large"
              avatar={
                <Avatar
                  aria-label="recipe"
                  src="static/reigns/1.jpg"
                  // className={classes.avatar}
                  className={classes.large}
                ></Avatar>
              }
              // titleTypographyProps={{variant:'h1' }}
              title={<p className="BMDOHYEON" style={{ fontSize: "1.2em", transform: "translate(0, 1.5px)"}}>{props.user.detail.username}</p>}
              // subheader="September 14, 2016"
              />
            }
            

              <ExitToAppIcon style={{ position: "absolute", right: 0, top: "36%", marginRight: "4%", color: "rgba(0, 0, 0, 0.6)"}}/>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileGate;
