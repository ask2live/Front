import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import mySession from './mySession';
import messages from './messages';
import authorize from './authorize';
import questionlist from './questionlist';
import enteredSession from './enteredSession';
import volume from './volume';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    mySession,
    messages,
    authorize,
    questionlist,
    enteredSession,
    volume,
});

export default rootReducer;