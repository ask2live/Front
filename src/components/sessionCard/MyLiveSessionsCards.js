import { useHistory } from 'react-router';
import React from 'react';
import Moment from "react-moment";

import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import "../../styles/style.css";
import "../../App.css";



const useStyles = makeStyles((theme) => ({
    root: {
      width: 250,
      height: 250,
      borderRadius: "20px",
      boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
      float :"left",
      margin:"10px 10px",
    },
    media: {
        cursor: "pointer",
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardContent: {
        height: "30px"
    },
    cookieWrapper: {
        backgroundColor:"#EEAC4B",
        backgroundPosition:"center center",
        display : "block",
        width: "6.3em",
        height: "6.3em",
        marginLeft: "1em",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",

        
    },
    useCookie: {
        margin: "auto",
        backgroundImage: "url('/static/cookieMould.png')",
        backgroundPosition : "center center",
        backgroundSize: "100%",
        width: "6.3em",
        height : "6.3em",
        overflow: "hidden",
    },
    living : {
        background: "url('/static/living.gif') no-repeat",
        width : "17px",
        height: "17px",
        backgroundSize: "contain",
        position:"absolute",
        transform : "translate(13.2em, -13.7em)",
    }
  }));
  

const style = {
    contentWrapper : {
        // backgroundColor : "skyblue",
        width : "13.5em",
        height : "6em",
        margin : "0.7em 1.05em 1.05em 1.05em",
    },
    contentTime : {
        // backgroundColor : "pink",
        width : "13.5em",
        height : "1.8em",
    },
    contentTitle : {
        // backgroundColor : "coral",
        width : "13.5em",
        height : "1.8em",
        whiteSpace : ""
    },
    contentName : {
        // backgroundColor : "yellow",
        width : "13.5em",
        height : "1em",
        marginBottom : "3px"
    },
    contentWork : {
        // backgroundColor : "green",
        width : "13.5em",
        height : "1.2em",
        textOverflow:"ellipsis",
        whiteSpace: "nowrap",
        overflow:"hidden",
    },
    live2 : {
        display: "inline-block",
        backgroundImage : "url('/static/Live_2.png')",
        backgroundSize : "contain",
        backgroundRepeat: "no-repeat",
        width : "40px",
        height : "28px",
    },

}

const MyLiveSessionsCard = ({session}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    let now = new Date();

    const toDate = (reserve_date) => {
        let date = new Date(reserve_date);
        return date;
    } 

  return (
    <>
    {/* <div className="padding" onClick={() => {history.push({
        pathname: "/session?state=mylive&i_r_d="+ session.roomId + "&channelNum=" + session.channelNum" 
    })}}> */}
    <div 
    onClick={()=>{
                history.push({
                    pathname: "/session/live",
                    search: "?holeId=" + session.id + "&channelNum=" + session.livehole_id,
                    state : {
                        hostName : session.host_username,
                        hostImage : session.host_profile_image,
                    }
            })}}
    style={{cursor:"pointer"}}>
        <Card key={session.livehole_id} className={classes.root}>
            <br/>
            <div
            style={{backgroundImage: session.host_profile_image? "url('https://www.ask2live.me"+session.host_profile_image + "')" : "url('/static/reigns/1.jpg')"}}
            className={classes.cookieWrapper}

            ><div className={classes.useCookie}></div> </div>
            <div style={style.contentWrapper}>
                <div style={style.contentTime}>
                    <Grid container alignItems="center">

                    <div
                    style={style.live2}
                    />
                    <span
                    style={{fontSize:"0.8em"}}
                    className="NanumGothic3"
                    >
                        {session.count_participant}명
                    </span>
                    <span 
                    className="NanumGothic3"
                    style={{fontSize: "0.8em", color:"rgba(0, 0, 0, 0.4)", margin : "0px 3px"}}>
                        ·
                    </span>
                    <span className="fontGradi BMJUA" style={{fontSize:"0.9em"}}>
                        <Moment format="mm분 전 시작">
                             {now - toDate(session.reserve_date)}
                        </Moment>
                    </span>
                    </Grid>
                </div>
                <div style={style.contentTitle}>
                    <span className="BMDOHYEON" style={{fontSize:"1em"}}>
                        {session.title}
                    </span>
                </div>
                <div style={style.contentName}>
                    <span className= "NanumGothic3" style={{fontSize : "0.8em"}}>
                        {session.host_username}
                    </span>
                </div>
                <div style={style.contentWork}>
                    <span className= "NanumGothic3" style={{color: "rgba(0, 0, 0, 0.5)", fontSize : "0.8em"}}>
                            {session.host_work_company ? 
                            <>
                             {session.host_work_company}
                            </>
                             : null}
                            {session.host_work_field ? 
                            <>
                             {" | " + session.host_work_field}
                            </>
                             : null}
                             {
                                !session.host_work_company && !session.host_work_field ?
                                <>ASK2LIVE | Live Q&A</>
                                :
                                <></>
                             }
                        </span>
                </div>


            </div>
            {/* <CardMedia
            className={classes.media}
            image={"/static/live_IU.png"}
            title={session.title}
            onClick={()=>{
                history.push("/session/live?roomId=" + session.livehole_id + "&channelNum=" + session.livehole_id)
            }}
            /> */}
            {/* <div 
             <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                {session.host_username}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={session.title}
            subheader={
                <>
                <Typography variant="body2">
                <Moment format="mm분 전 시작">
                {toDate(session.reserve_date) - now}
                </Moment>
                </Typography>
                </>}
            />
            <CardContent className={classes.cardContent}>
                <div className="centered">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {session.description}
                    </Typography>
                </div>
            </CardContent> 
             <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon/>
            </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    라이브 중
                </Typography>
            </CardContent>
            </Collapse> */}
        <div className={classes.living}/>
        </Card>
    </div>
    </>
  );
}

const MyLiveSessionsCards = ({myLiveSessions}) => {
    return (
        <>
            {myLiveSessions.map((session) => (
                <>
                <MyLiveSessionsCard session={session} />
                </>
            ))}
        </>
    )
}

export default MyLiveSessionsCards;