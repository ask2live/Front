import React, { useRef, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { List, PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import Message from './Message';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import Spinner from './Spinner';
import { onRoomMessagesRead } from '../../../actions/MessagesActions';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import InsertField from "../InsertField"
import "../../../styles/style.css"
import { useCacheErrors } from 'antd/lib/form/util';
// import List from '@material-ui/core/List';

import { useSelector } from 'react-redux';

const windowPadding = 325;

const style = {
    InsertfieldWrapper: {
        position: "fixed",
        display: "flex",
        alignItems: 'center',
        justifyContainer : "center",
        height : "4.5em",
        bottom:"0%",
        width: "90%",
        marginLeft:"auto",
        marginRight:"auto",
        maxWidth: "43em",
        zIndex:"8",
    },
    Insertfield:{
        position: "absolute",
        display: "flex",
        alignItems: 'center',
        left : "0%",
        width: "100%",
        marginLeft:"auto",
        marginRight:"auto",
        maxWidth: "44em",
        zIndex:"8",
    },
    top : {
        zIndex:"2",
        position : "absolute",
        top : "15%",
    }

}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent:"center",
      alignItems:"center",
      flexDirection: "column",
      color:"rgba(239, 89, 65, 0.6)",
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));

const Chat = props => {

    const classes = useStyles();

    let currentUrl = window.location.href;
    console.log("Chat Url : ", currentUrl);
    const params1 = currentUrl.split('?')
    const params2 = params1[1].split('&')
    const params3 = params2[1].split('=')
    const roomId = params3[1]


    const scrollToBottom = () => {
        let element = document.querySelector(".chatting");
        if (element) {

          element.scrollTop = element.scrollHeight ? element.scrollHeight : 0;
        }
        console.log("Here");
    }

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState('');
  const [roomSocket, setRoomSocket] = useState(null);

  // const roomId = "c9c9dd9bb";

  
  const { messages: { messages, loading: loadingChat }, username,  onRoomMessagesRead } = props;
  const { room, windowHeight, onBack} = props;
  

  const user = useSelector(state => state.user.data.detail);

  useEffect(() => {
      roomSocket && roomSocket.close();
      setRoomSocket(onRoomMessagesRead(roomId)); //세션에 관한 정보 중에서 session.id를 넣으면 채팅방이 구분됨
      // 채팅 올라오는 속도 조절은 타임아웃으로.. 
      setTimeout(scrollToBottom,500);  
    }, [room]);
    
    const onMessageSend = () => {
      if (roomSocket) {
        roomSocket.send(JSON.stringify({ command: 'new_message', data: { text: message, sender: user.username, type:'ON_MESSAGES_READ' } }));
        setMessage('');
        setTimeout(scrollToBottom,300);
      }
    }

    const handleInfiniteOnLoad = () => {
        setLoading(true);
        messages.length > 14 && setLoading(false) && setHasMore(false);
    };
    
  const renderList = () => {
    if (loadingChat) return  (
        <>
    <Grid style={style.top} container justify="center">
        <div  className={classes.root}>
            <CircularProgress color="inherit"/>
            <p style={{color:"black", margin:"5px 0 0 0"}}>Loading Chat</p>
        </div>
    </Grid>
        </>
    )

    if (!messages.length) return <EmptyScreen description='' containerStyle={{ borderWidth: 0 }} />;

    return (
        <>
      <div className="chatting">
        {console.log("----------message-----------",message)}
        <List
          className="comment-list NanumGothic3"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={message => <Message key={message.id.toString()} message={message} />}
        >
        </List>
          {loading && hasMore && <div className="loading-container"><Spin /></div>}
      </div>
      </>
    );
}

return (
    <React.Fragment>
      
      <div style={{ height: windowHeight - windowPadding }}>
        {renderList()}

      </div >
        <Grid container justify="center">

        <div style={style.InsertfieldWrapper}>
            <div style={style.Insertfield}>
                    <InsertField
                    holeId={props.holeId}
                    channelNum={props.channelNum} 
                    isHost={props.isHost} 
                    message={message} 
                    goSetMessage={setMessage} 
                    goMessageSend={onMessageSend} 
                    goListUp = {props.goListUp} 
                    goDark={props.goDark} 
                    goQueUp={props.goQueUp}
                    goUserUp={props.goUserUp}/>
            </div>
        </div>
        </Grid>
      {/* <MessageInput message={message} onChange={e => setMessage(e.target.value)} onSendClick={onMessageSend} /> */}
    </React.Fragment>
  );
}

Chat.propTypes = {
  room: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  windowHeight: PropTypes.number,
  onBack: PropTypes.func,
  onRoomMessagesRead: PropTypes.func.isRequired
}

//상태를 연결시키는 함수는 mapStateToTrops로 만들어서 connect에 전달해준다.
//Store 안의 state 값을 props로 연결해준다.
const mapStateToProps = state => {
  const { messages } = state;
  const { username } = state.user;
  return { username, messages };
}

// chat 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할을 한다.
// 함수가 여러개였다면 mapDispatchProps로 연결해줘야했을듯
export default connect(mapStateToProps, { onRoomMessagesRead })(Chat);