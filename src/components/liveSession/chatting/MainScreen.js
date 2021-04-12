import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Rooms from './Rooms';
import Chat from './Chat';
import EmptyScreen from './EmptyScreen';
import RoomsListHeader from './Header';
import { onMessagesValueChange } from '../actions';

import {useHistory} from "react-router-dom"

const MainScreen = memo(props => { //props 삭제

  const history = useHistory();

  const [room, setRoom] = useState(8);

  const { windowHeight, onMessagesValueChange } = props;

  const onRoomSelect = room => {
    onMessagesValueChange({ messages: [] });
    setRoom(room);
  }

  return (
    <React.Fragment>

      <Row>
        <Col span={17} style={{ paddingLeft: 15 }}>
          {room ? history.push({
            pathname : "/hole/" + room.id,
            state : {
              room : room,
              windowHeight: windowHeight,
              onBack : setRoom(null)
            }
          }) : <EmptyScreen description="No room selected" />}

           {/* <Chat room={room} windowHeight={windowHeight} onBack={() => setRoom(null)} /> */}
        </Col>
      </Row>
    </React.Fragment>
  )
})

MainScreen.propTypes = {
  windowHeight: PropTypes.number,
  onMessagesValueChange: PropTypes.func.isRequired
}

export default connect(null, { onMessagesValueChange })(MainScreen);