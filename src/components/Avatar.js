import React, {useEffect, memo} from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent :"center",
        alignItems : "center",
        height:"5.5em",
        width:"5.5em",
        padding:"3px",
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        zIndex:"1",
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },

  }));   

const style = {
    circleWrap : {
        margin : "4px",
    },
    circle1 : {
        border : "solid 1px rgba(255, 255, 255, .3)",
        borderRadius : "100%",
        padding:"6px",
    },
    circle2 : {
        border : "solid 1px rgba(255, 255, 255, .6)",
        borderRadius : "100%",
    },
    circleWhite : {
        border : "solid 2px rgba(255, 255, 255, 0.9)",
        borderRadius : "100%",
        padding:"6px",
    }
}

const UserAvatar = memo((props) => {
    const classes = useStyles();;
    const volume = useSelector(state => state.volume);
    const liveInfo = useSelector(state => state.enteredSession);

    if (liveInfo.arrived)
    {
        // console.log("liveInfo ----------",liveInfo);
        if (props.isHostAvatar)
        {
            const hostUid = liveInfo.data.detail.livehole.host_uid;
            return (
                <>
                <div className={classes.root}>
                    <div style={volume[hostUid] > 0.5 ? style.circle2 : null}>
                        <div style={style.circleWrap}>
    
                            <div style={volume[hostUid] > 0.2 ? style.circleWhite : style.circle1}>
                                    <Avatar alt={props.hostName} src={props.imageLink ? "https://www.ask2live.me"+props.imageLink : "/static/reigns/1.jpg"} className={classes.large}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </>
            )
        }
        else
        {
            return (
                <>
                <div className={classes.root}>
                    <div style={volume[props.userUid] > 0.5 ? style.circle2 : null}>
                        <div style={style.circleWrap}>
    
                            <div style={volume[props.userUid] > 0.2 ? style.circleWhite : style.circle1}>
                                    <Avatar alt={props.hostName} src={props.imageLink ? "https://www.ask2live.me"+props.imageLink : "/static/reigns/1.jpg"} className={classes.large}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </>
            )
        }
    }
    else
    {
        return (
            <div className={classes.root}>
                <div style={style.circle1}>
                        <Avatar alt={props.hostName} src={props.imageLink ? "https://www.ask2live.me"+props.imageLink : "/static/reigns/1.jpg"} className={classes.large}/>
                </div>
            </div>
        )
    }

})

export default UserAvatar



