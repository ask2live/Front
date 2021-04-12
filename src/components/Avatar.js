import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    circle : {
        border : "solid 1px rgba(255, 255, 255, .3)",
        borderRadius : "100%",
    }
}

const UserAvatar = (props) => {
    const classes = useStyles();

    return (
        <>
        <div style={style.circle}>
            <div className={classes.root}>
                <Avatar alt={props.hostName} src={props.imageLink ? "https://143.248.226.7:8000"+props.imageLink : "/static/reigns/1.jpg"} className={classes.large}/>
            </div>
        </div>
        </>
    )

}

export default UserAvatar



