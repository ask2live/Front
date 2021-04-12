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
        height: "11em",
        // height: "70px",
        borderRadius : "30px",
        border: "1px solid #EF5941",
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
        borderRadius: "30px 30px 0 0 "
    },
    questionbutton : {
        width : "100%",
        display : "flex",
        justifyContent : "center",
        position: "absolute",
        top : "-0.7em",
        zIndex:"3",
        height:"1px",
    },
    card : {
        transform:"translate(-1px, -1px)",
        paddingTop:"4px",
        position: "absolute",
        width: "100%",
        maxWidth:"42em",
        borderRadius : "30px 30px 0 0",
        backgroundColor: "#EF5941",
        height: "3em",
        // height: "20px",
        zIndex:"3",
        // padding: "3px",
    },
    submitbtn : {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        right: "1em",
        width: "10%",
        top: "0.5em",
        height: "2.4em",
        zIndex: "3",
    },
    insert : {
        marginTop: "10px",
        display : "block",

        top: "4em",
        left : "10px",
        height: "7em",
        width:"90%",
        border : "none",
    },
    nav : {
        display: "table",
        position:"absolute",
        top:"0%",
        zIndex:"3",
        width:"100%",
        height: "2em",
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
            // props.roomSocket.send(
            //     JSON.stringify({ command: "create_question", data: { pk: props.holeId, is_voice : false, question: ask, token: localStorage.token}})); 
            setAsk("")
            props.openQuestionAlert();
            props.goQueUp({transform : "translate(0, 100%)"});
            props.goDark({opacity: "0", animation: "golight 0.7s"});
            setTimeout(()=>{props.goDark({display: "none"})}, 700)
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
        //   console.log(data);
          const res = await axios.post(
            "https://143.248.226.7:8000/api/hole/"+props.holeId + "/question/create",
            data,
            {headers:headers}
          );
          console.log("QUESTIONING RES ::", res)
          if (res.data.response === "SUCCESS")
          {
            console.log("QUESTIONING RES SUCCESS");
            props.roomSocket.send(
                JSON.stringify({ command: "fetch_questions", data: {pk: props.holeId} }));
          }
            
    }
    const [click1, setClick1] = useState({borderBottom:"2px solid #EF5941"})
    const [click2, setClick2] = useState();

    return (
        <>
        <div style={style.nav}>
            <td style={{width:"50%"}}>
                <div style={{display:"flex",  justifyContent : "center"}}>
                <p 
                style={click1} 
                onClick={()=>{
                    setVoice(true); 
                    setQueStyle({opacity: "1"});
                    setClick2(); 
                    setClick1({borderBottom:"2px solid #EF5941"})}}
                className="Gmarket3">음성 질문</p>
                </div>
            </td>
            <td>
                <div style={{display:"flex",  justifyContent : "center"}}>
                <p 
                style={click2}
                onClick={()=>{
                    setVoice(false); 
                    setQueStyle({opacity: "0", display : "none"}) ;
                    setClick1(); 
                    setClick2({borderBottom:"2px solid #EF5941"})}}
                className="Gmarket3">텍스트 질문</p>
                </div>
            </td>
        </div>
        <Paper style={style.paper} elevation={0}>
            <Grid container justify="center">
                <div className={classes.root}>
                    <Paper elevation={0} >
                        <div style={style.card}>
                            {
                                myInfo.arrived?
        
                                <div 
                                style={{position:"absolute", marginLeft: "1.5em", marginTop: "0.7em"}}>
                                    <span
                                    style={{color:"white"}}
                                    className="BMJUA"
                                    >{myInfo.data.detail.username}</span>
                                    <span
                                    style={{marginLeft: "5px", fontSize: "0.8em", color:"white"}}
                                    >님의 질문</span>
                                </div>
    
                                :
                                <span> 로딩중 </span>
                            }
                        </div>
                        <div style={queStyle} className="QuestioningWrapper">
                            <p className="Gmarket1" style={{margin:"2em 0 0 0", color: "white", fontSize:"1em"}}>
                                음성으로 물어볼래요!
                            </p>
                            <p className="NanumGothic2" style={{margin:"1em 0 0 0",color: "white", fontSize:"0.7em"}}>
                                차례가 됐을 때 호스트가
                            </p>
                            <p className="NanumGothic2" style={{margin:"0",color: "white", fontSize:"0.7em"}}>
                                음성권한을 부여할 수 있습니다
                            </p>
                        </div>
                        <div style={{
                            display: "flex", justifyContent:"center",
                            width:"100%", height:"8em", transform:"translate(0, 3em)"}}>
                            <textarea
                            value={ask}
                            style={style.insert}
                            className="Gmarket2"
                            placeholder="질문을 입력하세요!"
                            maxLength="99"
                            onChange={(e) => setAsk(e.target.value)}
                            onKeyPress={pressEnter}
                            />
                        </div>
                        <div style={style.submitbtn}>
                        <IconButton
                            style = {{color: "white", fontSize: "1em"}}
                            onClick={()=>{
                                if (voice)
                                {
                                    postApi(true, "(음성 질문입니다)"); 
                                    // props.roomSocket.send(
                                    //     JSON.stringify({ command: "create_question", data: { pk: props.holeId, is_voice : true, question: "(음성 질문입니다.)", token: localStorage.token}})); 
                                    setAsk("");
                                    props.openQuestionAlert();
                                    props.goQueUp({transform : "translate(0, 100%)"}); 
                                    props.goDark({opacity: "0", animation: "golight 0.7s"});
                                    setTimeout(()=>{props.goDark({display: "none"})}, 700)
                                }
                                else if (!voice && ask.length >= 1)
                                {
                                    postApi(false, ask);
                                    // props.roomSocket.send(
                                    //     JSON.stringify({ command: "create_question", data: { pk: props.holeId, is_voice : false, question: ask, token: localStorage.token}})); 
                                    setAsk("")
                                    props.openQuestionAlert();
                                    props.goQueUp({transform : "translate(0, 100%)"}); 
                                    props.goDark({opacity: "0", animation: "golight 0.7s"}); 
                                    setTimeout(()=>{props.goDark({display: "none"})}, 700)
                                }}}
                            className="BMJUA" 
                            aria-label="send">
                            등록
                        </IconButton>
                        </div>
                        <div style={{display:"block", zIndex: "1"}}>
                        <span style={{
                            fontSize: "13px", position:"absolute", zIndex:"1", right:"0", bottom:"0", transform:"translate(-2.5em, -0.5em)"
                        }}>{ask.length}/100</span>

                        </div>
                    </Paper>
                </div>
            </Grid>
        <div style={style.questionbutton}>
            <IconButton style={{transform:"translate(0, 1em)"}} onClick={()=>{props.goQueUp({transform : "translate(0, 100%)"}); props.goDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{props.goDark({display: "none"})}, 700)}} aria-label="question_list">
                <CloseQuestioning fontSize="large" />
            </IconButton>
        </div>
        </Paper>
        </>
    )
}

export default Questioning