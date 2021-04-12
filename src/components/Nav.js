import { useHistory } from "react-router-dom";
import React from 'react';
import axios from 'axios';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ExitButton from '@material-ui/icons/PowerSettingsNew';
import LoginButton from '@material-ui/icons/MeetingRoom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/icons/Notifications';
import { Person, Home } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Apps';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

const [MyPageIcon, HomeIcon] = [Person, Home];

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: "2%",
        left : "0",
        right: "0",
        margin : "auto",
        backgroundColor: "#eb4e27",
        borderRadius: "15px", 
        width: "90%",
        maxWidth: "44em",
        zIndex: "1"
      },
  }));
  

const NavOfGuest = (props) => { // 지금은 쓰지 않는다
    const classes = useStyles();
    const history = useHistory();


  return (
    <>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
            <Grid container justify="center" alignItems="center">
            <Toolbar>
                <IconButton  color="inherit" aria-label="menu">
                    <HomeIcon/>
                </IconButton>
                <IconButton  color="inherit" aria-label="login" onClick={()=>{
                        history.push('/login');
                    }}>
                    <LoginButton/>
                </IconButton>
            </Toolbar>
            </Grid>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

// const Logout = async() => {
//   const headers = {
//     'Authorization': 'Token ' + localStorage.token
//   }
//   const data = {}
//   const res = await axios.post('https://143.248.226.7:8000/api/user/logout', data, {headers:headers})
//   // window.location.replace('/')
// }

const NavOfUser = (props) => {
    
    const user = props.user.data.detail;
    
    const classes = useStyles();

    const history = useHistory();


  return (
    <>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
            <Grid container justify="center" alignItems="center">
            <Toolbar>
            <table style={{borderSpacing : "1.5em 0px"}}>
                <tr>
                    <td>
                    <Grid container justify="center" alignItems="center">
                        <IconButton style={{padding: "0", }} color="inherit" aria-label="menu">
                            <HomeIcon onClick={() => {
                            history.push('/');}} />
                        </IconButton>
                    </Grid>
                    </td>
                    <td>
                    <Grid container justify="center" alignItems="center">
                        <IconButton style={{padding: "0", }} color="inherit" aria-label="mypage">
                            <MyPageIcon onClick={ () => {
                            history.push("/mypage");
                            } }/>
                        </IconButton>
                    </Grid>
                    </td>
                    {/* <td >
                    <Grid container justify="center" alignItems="center">
                        <IconButton style={{padding: "0", }} color="inherit" aria-label="logout">
                        <ExitButton onClick={()=> {
                          Logout()
                          localStorage.clear()
                          window.location.replace('/')
                          }}/>
                         </IconButton>
                    </Grid>
                    </td> */}
                </tr>                
                <tr>
                    <td style={{fontSize : "0.5em"}}>Home</td>
                    <td style={{fontSize : "0.5em"}}>Mypage</td>
                    {/* <td style={{fontSize : "0.5em"}}>Logout</td> */}
                </tr>                
            </table>
            </Toolbar>
            </Grid>
        </AppBar>
      </HideOnScroll>
      {/* <Toolbar /> */}
    </>
  );
}

export {
    NavOfGuest,
    NavOfUser,
}