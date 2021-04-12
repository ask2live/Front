import ReconnectingWebSocket from 'reconnecting-websocket';
import { WS_ENDPOINT } from '../environment';
import { ON_MESSAGES_VALUE_CHANGE, ON_MESSAGES_READING, ON_MESSAGES_READ, QUESTIONLIST_READ, QUESTIONLIST_SOCKET_READ } from './types';
import getQuestionlist from "./QuestionListActions";

//export const onMessagesValueChange = data => ( console.log('data',data));
export const onMessagesValueChange = data => ({ type: ON_MESSAGES_VALUE_CHANGE, payload: data });

export const onRoomMessagesRead = (realHoleId, holeId) => dispatch => {
  dispatch({ type: ON_MESSAGES_READING });

  const socket = new ReconnectingWebSocket(`${WS_ENDPOINT()}/hole/${holeId}/`);

  socket.debug = true;

  console.log("-----------socket--------------",socket);

  socket.onopen = event => console.log('WebSocket Connected'); 
  socket.onerror = event => console.log('error event : ', event);
  socket.onmessage = event => 
  { 
      console.log("EVENT :: ",event);
      JSON.parse(event.data).type === "QUESTION" ?
      dispatch(getQuestionlist(realHoleId))
      : dispatch({ type: JSON.parse(event.data).type, payload: { messages: JSON.parse(event.data).data}})}

  socket.onclose = event => console.log('WebSocket Disconnected');

  return socket;
}