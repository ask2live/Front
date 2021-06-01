import React from "react";

import {makeStyles} from "@material-ui/core/styles"
import Avatar from '@material-ui/core/Avatar';

const style = {
    cloud : {
        display : "inline-block",
        backgroundColor : "white",
        borderRadius : "20px",
        margin: "0 0 0.6em 1em",
        padding: "0.4em 0.8em",
        fontSize: "0.9em"
    },
    audience1 : {
        margin: "5px 0 5px 5px",
        fontSize: "13px",
        color : "rgba(255,255,255,1)"
    },
    audience2 : {
        margin: "5px 0 5px 5px",
        fontSize: "13px",
        color : "rgba(255,255,255,0.6)"
    }
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
  }));

const StringQuestion = (props) => {
    const classes = useStyles();

    let questionStr = props.userQuestion;

    let maxNum = 23;
    let dst;
    let questionStrAry = []
    
    while (true)
    {
        if (questionStrAry.length === 2)
            break;
        if (questionStr.length <= maxNum)
        {
            questionStrAry.push(questionStr)
            break;
        }
    
        dst = questionStr.lastIndexOf(" ", maxNum);
    
        if (dst == -1)
        {
            questionStrAry.push(questionStr.substring(0, maxNum - 1))
            questionStr = questionStr.slice(maxNum);
        }
        else
        {
            questionStrAry.push(questionStr.substring(0, dst))
            questionStr = questionStr.slice(dst + 1);
        }
    }

    return (
        <>
        <div style={{margin: "0em 0em 0.5em 1em", display:"flex"}}>
            <Avatar src={props.hostImage} className={classes.small}/>
            <span style={style.audience1} className="NanumGothic">{props.userNickName}</span>
            <span style={style.audience2} className="NanumGothic">님의 질문</span>
            {props.isHost?
            <button
            onClick={()=>{props.onAnswered(props.currentQuestionId)}}
            >완료</button>
            :
            <></>
            }
        </div>
        {/* {console.log(questionStrAry)} */}
        {
            questionStrAry.map((questionUnit) => 
            <>
                <p style={style.cloud} className="BMJUA">{questionUnit}</p><br/>
            </>
            )
        }

        </>
    )
    
}

export default StringQuestion;