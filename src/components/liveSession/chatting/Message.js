import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

const Message = memo(props => {
  const { message: { sender, sent_timestamp, text } } = props;


  return (

    <div style={{display:"flex", width: "100%"}}>
        <div style={{color: "rgba(255,255,255,0.5)", display:"flex", width: "9em", margin: "0 1em 15px 0"}}>
            {sender}
        </div>
        <div style={{position:"relative", width: "100%", maxWidth : "37em", display:"flex", wordBreak: "break-all" , textAlign: 'left' }}>
         {text}
        </div>
    </div>
  );
})

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message;