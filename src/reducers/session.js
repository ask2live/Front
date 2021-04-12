
import {
    SESSION_GET_PENDING,
    SESSION_GET_SUCCESS,
    SESSION_GET_FAILURE,
  } from '../actions/types';


const initialState = {
    pending: false,
    error: false,
    data: []
}

export const session = (state = initialState, action) => {
    switch (action.type) {
        case SESSION_GET_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            };
        case SESSION_GET_SUCCESS:
            const sessionInfo = action.payload.data; 
            return {
                ...state,
                pending: false,
                data: sessionInfo
            };
        case SESSION_GET_FAILURE:
            return {
                ...state,
                pending: false,
                error: true
            }
        default:
            return state;
    }
}

export default session;