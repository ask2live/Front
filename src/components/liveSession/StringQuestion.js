import React, {useEffect, useState} from "react";

import {makeStyles} from "@material-ui/core/styles"
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import CloseQuestioning from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const style = {
    audience1 : {
        margin: "5px 0 5px 5px",
        fontSize: "13px",
        color : "rgba(255,255,255,1)"
    },
    audience2 : {
        margin: "5px 0 5px 5px",
        fontSize: "13px",
        color : "rgba(255,255,255,0.6)"
    },
    paper : {
        position: "absolute",
        width: "90%",
        height : "100%",
        maxWidth:"30em",
        backgroundColor: "red",
        borderRadius: "30px 30px 30px 30px "
    },
    card : {
        transform:"translate(-1px, -1px)",
        position: "absolute",
        width: "90%",
        maxWidth:"30em",
        borderRadius : "30px 30px 0 0",
        backgroundColor: "#EF5941",
        height: "20%",
        // height: "20px",
        zIndex:"3",
        display:"flex",
        alignItems:"center",
        // padding: "3px",
    },
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    root2: {
    maxWidth: "30em",
    height:"inherit",
      display: 'flex',
      flexWrap: 'wrap',
    //   width: "95%",
      width: "90%",
    //   marginBottom: "3px",
      
      '& > *': {
          
        // margin: theme.spacing(2),
        width : "100%",
        height: "inherit",
        // height: "70px",
        borderRadius : "30px",
        border: "1px solid #EF5941",
      },
    },
  }));


const StringQuestion = (props) => {
    const classes = useStyles();

    let questionStr = props.userQuestion;
    const [finish, setFinish] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false);


    return (
      
        <>
        <div style={{
            zIndex:"2", 
            alignItems: "center", 
            justifyContent:"center",
            display:"flex", 
            position:"absolute", 
            // backgroundColor:"skyblue",
            height:"95%", 
            width:"100%"}}>

 

            <div className={classes.root2}>
                <Paper>
                    <div style={style.card}>
                            <div 
                            style={{
                            position:"absolute", 
                            display:"flex", 
                            alignItems:"center", 
                            height:"100%", 
                            marginLeft: "1.5em"}}>
                                <div style={{display:"inline-block"}}>
                                    <Avatar src={props.imageLink? "https://www.ask2live.me" + props.imageLink : "/static/reigns/1.jpg"} className={classes.small}/>
                                </div>
                                <span
                                style={{marginLeft:"6px", marginTop:"3px", color:"white"}}
                                className="BMJUA"
                                >{props.userNickName}
                                </span>
                                <span
                                style={{marginLeft: "5px", fontSize: "0.8em", color:"white"}}
                                >님의 질문
                                </span>
                            </div>
                    </div>
                    <div 
                    className="currQuestion">
                        <span className="Gmarket2">{questionStr}</span> 
                    </div>

                 
                </Paper>
            </div>
            <div style={{position:"absolute", bottom:"-3%", height:"20%", width:"100%", display:"flex", alignItems:"center",justifyContent:"center"}}>
                {props.isHost?
                <button
                className="NanumGothic3"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:"center",
                    position:"absolute", 
                    transform:"translate(0, 0px)",
                    zIndex: "3",
                    height:"100%", 
                    width: "6em", 
                    backgroundColor: "#3B3B3B",
                    fontSize:"0.7em",
                    borderRadius:"16px",
                    color:"#EF5941",
                    border:"1px solid #EF5941",
                    zIndex:"3",
                }}
                disabled={btnDisable}
                onClick={()=>{
                    setBtnDisable(true)
                    props.onAnswered(props.currentQuestionId)
                    setFinish(true)
                    setTimeout(()=>{setFinish(false); setBtnDisable(false)}, 4000)             
                }}
            >{finish ? 
            <div className="loadingCircle"></div> 
            :  
            "답변완료"
            }</button>
                :
                <></>
                }
            </div>
                
        </div>
        </>
        




//---------------------------------------------------


        // <>
        // <div style={{margin: "0em 0em 0.5em 1em", display:"flex"}}>
        //     <Avatar src={props.hostImage} className={classes.small}/>
        //     <span style={style.audience1} className="NanumGothic">{props.userNickName}</span>
        //     <span style={style.audience2} className="NanumGothic">님의 질문</span>
        //     {props.isHost?
        //     <button
        //     onClick={()=>{props.onAnswered(props.currentQuestionId)}}
        //     >완료</button>
        //     :
        //     <></>
        //     }
        // </div>
        // {console.log(questionStrAry)}
        // {
        //     questionStrAry.map((questionUnit) => 
        //     <>
        //         <p style={style.cloud} className="BMJUA">{questionUnit}</p><br/>
        //     </>
        //     )
        // }

        // </>
    )
    
}

export default StringQuestion;