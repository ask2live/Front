import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, {useState, memo} from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginButton from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import Grid from "@material-ui/core/Grid"
import "../../styles/style.css";
import {getUserInfo} from "../../actions/UserActions";
import { SignalCellularNoSimOutlined } from '@material-ui/icons';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiTextField-root': {
      width: '25ch',
    },
    '& > *': {
    },
  },
  list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
  }
}));

const style = {
    login : {
        position : "absolute",
        display:"flex",
        width:"100%",
        justifyContent:"center",
        flexDirection: "column",
        top : "43%",
    },
    loginWrapper : {
        position : "fixed",
        backgroundColor : "white",
        width : "100%",
        height : "100%",
    },
    loginCard : {
        top : "18%",
        // backgroundColor: "skyblue",
        border: "1px solid black",
        borderRadius: "15px",
        boxShadow: "1px 1px 2px 2px black",
        paddingTop: "1em",
        maxWidth : "23em",
        width : "16em",
        height : "21em",
        position : "fixed",
    },
    loginBtnWrapper : {
        position: "absolute",
        top : "88%",
        backgroundColor: "black",
        borderRadius: "15px",
        color: "white",
    },
    loginBtn : {

        backgroundColor: "black",
        borderRadius: "15px",
        color: "white",
    },
    infoIcon : {
        color :"grey",
        position: "absolute",
        top: "88%",
        right: "4%",
        cursor: "pointer",
    },
    logo : {
        height: "2.3em",
        width : "2.3em", 
        backgroundImage:"url('/static/logo.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
    }
}

const LoginPage = (props) => { 
    const history = useHistory();
    if (localStorage.token) {
      history.push('/main')
    }

    const [loginId, setLoginId] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
  
    const handleClick = () => {       
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClickTwo = () => {       
        setOpenTwo(true);
    };
    
    const handleCloseTwo = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenTwo(false);
    };
    
    
    const dispatch = useDispatch();


    // const [id, setId] = useState("") 

    const Login = async({loginId, loginPassword}) => {
      let dataToSubmit = {
        username : loginId,
        password : loginPassword
      }
      axios.post('https://143.248.226.7:8000/api/user/login', 
      dataToSubmit,
      ).then((res) => {
        console.log("res", res)
        window.localStorage.setItem('token', res.data.detail.token)
        dispatch(getUserInfo(res.data.detail.token));
        console.log(res);
        if (props.location.before)
            history.push(props.location.before)
        else
            history.push('/main')
      }).catch(
        (err) => handleClick())
    }

    return (
        <>
            <div style={style.loginWrapper}>
                <Grid container justify="center">
                    <div style={style.loginCard}>
                        <Grid container justify="center">
                             <p style={{margin : "10px 0 10px 0" , fontSize: "1.8em"}} className="Gmarket3">ASK</p>
                             {/* <div style={{display:"flex", paddingBottom: "4px", alignItems: "center"}}>
                                 <ContactSupportIcon style={{fontSize:40}}/>
                            </div> */}
                            <div style={style.logo}>
                            </div>

                            <p style={{margin : "10px 0 10px 0" , fontSize: "1.8em"}} className="Gmarket3">LIVE</p>
                        </Grid>
                        <Grid container justify="center">
                            <p className="NanumGothic3" style={{marginBottom:"0",fontSize : "0.8em"}}>궁금한 점을 자유롭게 물어보고</p>
                        </Grid>
                        <Grid container justify="center">
                            <p className="NanumGothic3" style={{marginTop: "8px", fontSize : "0.8em"}}>라이브로 생생한 답변을 들어보세요!</p>   
                        </Grid>
                        <div style={style.login}>
                            <Grid style={{height: "5em"}} container justify="center">
                                <TextField 
                                errer={loginId.length > 5}
                                helperText={loginId.length > 5 ? "닉네임은 6자까지만 가능합니다" : ""}
                                value={loginId}
                                placeholder="닉네임"
                                size="1em"
                                style= {{marginBottom : "1em"}}
                                id="outlined-search" type="search" variant="outlined"
                                onChange={(event) => 
                                    setLoginId(event.target.value.substring(0, 6))
                                }
                                />
                            </Grid>
                            <Grid container justify="center">
                                <TextField
                                style={{position:"absolute"}}
                                id="outlined-search" placeholder="패스워드" type="password" variant="outlined"
                                onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </Grid>
                        </div>
                
                        <Grid container justify="center">
                            <div style={style.loginBtnWrapper}>
                                <button style={style.loginBtn} onClick={() => Login({loginId, loginPassword})}>
                                    <span style={{fontSize: "1.2em"}} className="BMJUA">로그인</span>
                                </button>
                                {/* <button type="button" onClick={() => loginMatch(loginId)}/> */}
                            </div>
                        </Grid>
                        <InfoIcon 
                        onClick={handleClickTwo}
                        style={style.infoIcon}/>
                    </div>      
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    유효하지 않은 정보입니다.
                    </Alert>
                </Snackbar>
                <Snackbar 
                style={{position:"fixed", top: "80%"}}
                open={openTwo} autoHideDuration={6000} onClose={handleCloseTwo}>
                    <Alert 
                    style={{backgroundColor:"black"}}
                    onClose={handleCloseTwo} severity="error">
                    중복되지 않은 닉네임으로<br/>
                    회원가입과 동시에 로그인이<br/>
                    가능합니다!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )

};

export default LoginPage