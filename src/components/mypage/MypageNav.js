import { useHistory } from "react-router";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Home } from '@material-ui/icons';

const style = {
  root: {
    height: "7%",
    left: 0,
    right: 0,
    position: "fixed",
    margin: "auto",
    // maxWidth: "73em",
    fontFamily: "BMDOHYEON",
    backgroundColor: "#fff8ef",
    borderBottom: "2px solid",
    top: 0,
    zIndex: 1,
  },
  borderbox: {
    display: "flex",
    height: "100%",
    margin: "auto",
  },
  text: {
    transform: "translate(0, 1px)",
    margin: "auto",
  },
};

const MypageNav = (props) => {
  const history = useHistory();

  return (
    <>
      <div style={style.root}>
        <IconButton
          style={{ position: "absolute", left: 0, height: "100%" }}
          aria-label="back"
          onClick={() => history.goBack()}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton style={{ position: "absolute", right: 0, height: "100%", marginRight:"10px"}} color="inherit" aria-label="menu">
            <Home onClick={() => {
            history.push('/');}} />
        </IconButton>

        <div style={style.borderbox}>
          <span style={style.text}>{props.text}</span>
        </div>
      </div>
    </>
  );
};

export default MypageNav;
