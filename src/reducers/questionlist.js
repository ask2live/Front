import {
    QUESTIONLIST_GET_PENDING,
    QUESTIONLIST_GET_SUCCESS,
    QUESTIONLIST_GET_ERROR,
    QUESTIONLIST_DELETE,
    QUESTIONLIST_SOCKET_READ,
  } from '../actions/types';

const initialState = {
    arrived: false,
    pending : false,
    error: false,
    data: {}
};

//¸®µà¼­
const questionlist = (state = initialState, action) => {
    switch (action.type) {
        case QUESTIONLIST_GET_PENDING:
            console.log("PENDING");
            return {
                ...state,
                pending: true,
                error: false
            };
        case QUESTIONLIST_GET_SUCCESS:
            console.log("SUCCESS :", action.payload.data);
            return {
                ...state,
                arrived: true,
                pending: false,
                error: true,
                data: action.payload.data.detail
            };
        case QUESTIONLIST_GET_ERROR:
            return {
                ...state,
                arrived: false,
                pending: false,
                error: true
            }
        case QUESTIONLIST_DELETE:
            return {
                ...state,
                ...initialState
            }
        case QUESTIONLIST_SOCKET_READ:
            return {
                ...state,
                arrived: true,
                data: action.payload, 
            }
        default:
            return state;
    }
}  //! ?? ??? ?? ??

export default questionlist;