import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: "3%",
      maxWidth: "50em",
      borderRadius: "20px",
      boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
    },
    cardContent: {
      height: "30px",
    },
    cookieWrapper: {
      backgroundColor:"#EEAC4B",
      float: "left",
      marginLeft: "2%",
      width: "5em",
      height: "5em",
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
      width: "5em",
      height: "5em",
      overflow: "hidden",
    },
  }));

const style = {
    participant : {
        width: "100%",
        maxWidth: "30em",
        padding: "10px",
    },
    tmp: {
        float: "left",
        marginLeft : "2%",
    },
    follow: {
        float : "right",
        width: "5em",
        height:"5em",
        backgroundColor:"pink",
    }
}

const Participant = (props) => {

    const classes = useStyles();

    return (
        <>
            <Grid container justify="center">
                <Card style={style.participant} className={classes.root}>
                    <div
                        style={{backgroundImage: props.profileImage ? "url('https://www.ask2live.me" + props.profileImage +"')" : "url('/static/reigns/1.jpg')" }}
                        className={classes.cookieWrapper}
                    >
                        <div className={classes.useCookie}></div>
                    </div>
                    <div style={style.tmp}>
                        <p style={{marginBottom:"5px"}}>{props.nickName}</p>
                        <span className= "NanumGothic3" style={{color: "rgba(0, 0, 0, 0.5)", fontSize : "0.8em"}}>
                            {props.workCompany ? 
                            <>
                             {props.workCompany} |
                            </>
                             : null}
                            {props.workField ? 
                            <>
                             {" " + props.workField}
                            </>
                             : null}
                             {
                                !props.workCompany && !props.workField ?
                                <>ASK2LIVE | Live Q&A</>
                                :
                                <></>
                             }
                        </span>
                    </div>
                    {/* <div style={style.follow}>follow</div> */}
                </Card>
            </Grid>
        </>
    )
}

export default Participant;