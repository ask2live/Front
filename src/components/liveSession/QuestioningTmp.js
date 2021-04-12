import React, { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import CloseQuestioning from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import useSelection from "antd/lib/table/hooks/useSelection";
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        maxWidth: "42em",
      display: 'flex',
      flexWrap: 'wrap',
    //   width: "95%",
      width: "95%",
      bottom: "0%",
      marginBottom: "1em",
    //   marginBottom: "3px",
      
      '& > *': {
          
        // margin: theme.spacing(2),
        width : "100%",
        height: theme.spacing(10),
        // height: "70px",
        borderRadius : "15px",
      },
    },
  }));

const style = {
    paper : {
        position: "absolute",
        bottom:"0%",
        width: "100%",
        height : "100%",
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0 "
    },
    questionbutton : {
        position: "absolute",
        top: "-4%",
        right: "-2%",
    },
    card : {
        paddingTop:"4px",
        position: "absolute",
        width: "100%",
        maxWidth:"42em",
        borderRadius : "15px 15px 0 0",
        backgroundColor: "#D95032",
        height: "1.7em",
        // height: "20px",
        zIndex:"8",
        // padding: "3px",
    },
    submitbtn : {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        float: "right",
        right: "5px",
        width: "10%",
        top: "2.4em",
        height: "2.4em",
        zIndex: "2",
    },
    insert : {
        position:"absolute",
        top: "3.2em",
        left : "10px",
        height: "2em",
        width:"86%",
        borderBottom : "1px solid",
        borderTop: "0px",
        borderLeft : "0",
        borderRight: "0",
    }
}

const Questioning = (props) => {

    const classes = useStyles();

    const [ask, setAsk] = useState("")
    const [voice, setVoice] = useState(true)
    const [queStyle, setQueStyle] = useState({opacity: "1"})

    const myInfo = useSelector(state => state.user);



    const pressEnter = (e) => {
        if (e.key == 'Enter'){
            postApi(false, ask);
            setAsk("")
            props.openQuestionAlert();
            props.goQueUp({transform : "translate(0, 100%)"});
            props.goDark({opacity: "0", animation: "golight 0.7s"}); 
        }
    }

    const voiceClick = () => {
        if (voice)
        {
            setQueStyle({opacity: "0", display : "none"}) 
            // setTimeout((()=>setQueStyle({display: "none"})),1000)
        }
        else
            setQueStyle({opacity: "1"})
            // setTimeout((()=>setQueStyle({display:"flex"})),1000)
        setVoice(prevVoice => !prevVoice)
    }

    const postApi = async(isVoice, askValue) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              is_answered: false,
              is_voice: isVoice,
              question: askValue,
          };
          console.log(data);
          const res = await axios.post(
            "https://143.248.226.7:8000/api/hole/"+props.holeId + "/question/create",
            data,
            {headers:headers}
          );
    }

    return (
        <>
        <Paper style={style.paper} elevation={1}>
            <Grid container justify="center">
                <div className={classes.root}>
                    <Paper elevation={2} >
                        <div style={style.card}>
                            {
                                myInfo.arrived?
                                <span
                                style={{marginLeft: "10px"}}
                                className="BMJUA"
                                >{myInfo.data.detail.username}</span>
                                :
                                <span> 로딩중 </span>
                            }
                            <div style={{float:"right"}}>
                                <span className="BMJUA" style={{fontSize: "1em"}}> 텍스트로 질문하실래요? </span>
                                <Checkbox
                                    style={{color: "black", right : "3px", padding: "0"}}
                                    size="small"
                                    inputProps={{ 'aria-label': 'checkbox with small size' }}
                                    onClick={voiceClick}
                                />
                            </div>
                        </div>
                        <div style={queStyle} className="QuestioningWrapper">
                            <p className="NanumGothic3" style={{transform:"translate(0, 15px)", color: "white", marginLeft: "1em", fontSize:"0.8em"}}>차례가 되면 호스트가 음성 권한을 부여합니다.</p>
                        </div>
                        <input
                        type="text"
                        maxLength="60"
                        value={ask}
                        style={style.insert}
                        placeholder="최대 글자수는 60자입니다."
                        onChange={(e) => setAsk(e.target.value)}
                        onKeyPress={pressEnter}
                        />
                        <div style={style.submitbtn}>
                        <IconButton 
                            onClick={()=>{
                                if (voice)
                                {
                                    postApi(true, "(음성 질문입니다)"); 
                                    setAsk("");
                                    props.openQuestionAlert();
                                    props.goQueUp({transform : "translate(0, 100%)"}); 
                                    props.goDark({opacity: "0", animation: "golight 0.7s"}); 
                                    setTimeout(()=>{props.goDark({display: "none"})}, 700)
                                }
                                else 
                                    postApi(false, ask); setAsk("")
                                    props.openQuestionAlert();
                                    props.goQueUp({transform : "translate(0, 100%)"}); 
                                    props.goDark({opacity: "0", animation: "golight 0.7s"}); 
                                    setTimeout(()=>{props.goDark({display: "none"})}, 700)
                                }} 
                            className={classes.iconButton} 
                            aria-label="send">
                            <SendIcon/>
                        </IconButton>
                        </div>
                    </Paper>
                </div>
            </Grid>
        <IconButton style={style.questionbutton} onClick={()=>{props.goQueUp({transform : "translate(0, 100%)"}); props.goDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{props.goDark({display: "none"})}, 700)}} aria-label="question_list">
            <CloseQuestioning fontSize="large" />
        </IconButton>
        </Paper>
        </>
    )
}

export default Questioning