import {
    ENTEREDSESSION_GET_PENDING,
    ENTEREDSESSION_GET_SUCCESS,
    ENTEREDSESSION_GET_ERROR,
    ENTEREDSESSION_DELETE,
  } from '../actions/types';

const initialState = {
    arrived: false,
    pending : false,
    error: false,
    data: {}
};

//����??����
const enteredSession = (state = initialState, action) => {
    switch (action.type) {
        case ENTEREDSESSION_GET_PENDING:
            // console.log("EnteredSession PENDING");
            return {
                ...state,
                pending: true,
                error: false
            };
        case ENTEREDSESSION_GET_SUCCESS:
            // console.log("EnteredSession SUCCESS :", action.payload.data);
            return {
                ...state,
                arrived: true,
                pending: false,
                error: true,
                data: action.payload.data
            };
        case ENTEREDSESSION_GET_ERROR:
            return {
                ...state,
                arrived: false,
                pending: false,
                error: true
            }
        case ENTEREDSESSION_DELETE:
            return {
                ...state,
                ...initialState,
            }
        default:
            return state;
    }
}

export default enteredSession;