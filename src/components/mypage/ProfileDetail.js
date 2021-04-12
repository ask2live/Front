import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MypageNav from "./MypageNav";
import "../../styles/style.css";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';

import { getUserInfo } from "../../actions/UserActions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "95%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF5941",
    maxWidth: "50em",
    margin: "auto",
  },
  root2: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    margin: "auto",
    height: "95.3%",
    width: "88%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "15px 15px 0 0",
    boxShadow: "2px 1px 5px 3px rgba(0,0,0, 0.7)",
    maxWidth: "70em",
  },
  avatar: {
    position: "absolute",
    top: "8%",
    right: "5%",
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  username: {
    position: "absolute",
    fontFamily: "BMDOHYEON",
    fontSize: "1.3em",
    top: "9%",
    left: "5%",
  },
  work_company: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "28%",
    left: "5%",
  },
  work_field: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "34%",
    left: "5%",
    color: "grey",
  },
  bio: {
    position: "absolute",
    transform:"translate(0, -3em)",
    fontFamily: "BMJUA",
    // top: "50%",
    left: "5%",
  },
}));

const style = {
  editWrapper: {
    height: "7%",
    // left: 0,
    right: 0,
    position: "absolute",
    margin: "auto",
    // width: "100%",
    // maxWidth: "73em",
    bottom: 0,
    // zIndex: 1,
    // pointerEvents: "none",
  },
  editBtn: {
    // pointerEvents:"auto",
    // position: "absolute",
    // right:0,
    height: "100%",
    // fontFamily: "BMJUA",
    fontSize: "1em",
    // transform: "translate(0, 1px)",
  },
};

const ProfileDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // console.log("PROPS", props);
  const user = props.routerInfo.location.state;

  let profile = {};
  useEffect(() => {
    dispatch(getUserInfo(localStorage.token));
  });

  if (props.routerInfo.location.state.host) {
    const host = props.routerInfo.location.state.host;
    // console.log("host : ", host);
    if (!host.host_work_company.length)
      host.host_work_company = "";
    if (!host.host_work_field.length) host.host_work_field = "";

    profile = {
      username: host.host_username,
      profile_image: host.host_profile_image,
      work_company: host.host_work_company,
      work_field: host.host_work_field,
      bio: host.host_bio,
    };
  } else {
    if (!user.work_company.length)
      user.work_company = "";
    if (!user.work_field.length) user.work_field = "";
    
    profile = {
      username: user.username,
      profile_image: user.profile_image,
      work_company: user.work_company,
      work_field: user.work_field,
      bio: user.bio,
    };
  }

  let editFlag = false;
  if(user.username === profile.username) editFlag = true

  const goToEdit = () => {
    history.replace({
      pathname: `${profile.username}/edit`,
      state: user});
  }
  if (!user || !profile) return<p> 로딩중 </p>

  return (
    <>
        <MypageNav text={"프로필"} editFlag={editFlag} />
        

      <div className={classes.root}>
        <div className={classes.root2}>
        {user.username === profile.username && (
          <>
          <div style={style.editWrapper}>
            <Button onClick={goToEdit} style={style.editBtn}>
              <span className="CookieRun">편집</span>
            </Button>
          </div>
          </>
        )}
          <div>
            <p className={classes.username}>{profile.username}</p>
            {profile.profile_image?
            <Avatar
            className={classes.avatar}
            aria-label="recipe"
            src={`https://143.248.226.7:8000${profile.profile_image}`}
          ></Avatar>
          :
          <Avatar
            className={classes.avatar}
            aria-label="recipe"
            src="/static/reigns/1.jpg"
          ></Avatar>
          }

            
          </div>

          <p className={classes.work_company}>
            [근무 회사] {profile.work_company}
          </p>
          <p className={classes.work_field}>
            [일하는 분야] {profile.work_field}
          </p>

          <div
            style={{
              position: "absolute",
              top: "54%",
              width: "100%",
              height: "40.5%",
            }}
          >
            <p className={classes.bio}>
              [소개]
              <br />
            </p>
            <div className="bioWrapper">
                
              <p style={{fontFamily: "BMJUA", marginTop: 0, whiteSpace: "pre-wrap"}}>
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
