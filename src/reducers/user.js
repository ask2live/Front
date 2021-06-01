
import {
    USER_GET_PENDING,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    GIVEUSER
  } from '../actions/types';


const initialState = {
    pending: false,
    arrived : false,
    error: false,
    data: {}
}

// Reducer
const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            };
        case USER_GET_SUCCESS:
            const userInfo = action.payload.data;
            return {
                ...state,
                pending: false,
                arrived: true,
                data: userInfo
            };
        case USER_GET_FAILURE:
            return {
                ...state,
                pending: false,
                error: true
            }

        default:
            return state;
    }
}

export default user;