import {
    QUESTIONLIST_GET_PENDING,
    QUESTIONLIST_GET_SUCCESS,
    QUESTIONLIST_GET_ERROR,
    QUESTIONLIST_DELETE
  } from '../actions/types';

const initialState = {
    arrived: false,
    pending : false,
    error: false,
    data: {}
};

//���༭
const questionlist = (state = initialState, action) => {
    switch (action.type) {
        case QUESTIONLIST_GET_PENDING:
            // console.log("PENDING");
            return {
                ...state,
                pending: true,
                error: false
            };
        case QUESTIONLIST_GET_SUCCESS:
            // console.log("SUCCESS :", action.payload.data);
            return {
                ...state,
                arrived: true,
                pending: false,
                error: true,
                data: action.payload.data
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
        default:
            return state;
    }
}

export default questionlist;