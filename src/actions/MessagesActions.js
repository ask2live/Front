import ReconnectingWebSocket from 'reconnecting-websocket';
import { WS_ENDPOINT } from '../environment';
import { ON_MESSAGES_VALUE_CHANGE, ON_MESSAGES_READING, ON_MESSAGES_READ, ON_MESSAGES_INIT } from './types';

//export const onMessagesValueChange = data => ( console.log('data',data));
export const onMessagesValueChange = data => ({ type: ON_MESSAGES_VALUE_CHANGE, payload: data });

export const onRoomMessagesRead = holeId => dispatch => {
  dispatch({ type: ON_MESSAGES_READING });

  const socket = new ReconnectingWebSocket(`${WS_ENDPOINT()}/hole/${holeId}/`);
  socket.debug = true;

  console.log("-----------socket--------------",socket);

  socket.onopen = event => console.log('WebSocket Connected');
  socket.onerror = event => console.log('error event : ', event);
  socket.onmessage = event => {
    return dispatch({ type: JSON.parse(event.data).type, payload: { messages: JSON.parse(event.data).data}}); //여기서 type에 따라서 분기
  }
  socket.onclose = event => console.log('WebSocket Disconnected');

  return socket;
}