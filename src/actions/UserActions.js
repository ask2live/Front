import {
    USER_GET_PENDING,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
} from './types';

import axios from 'axios'

function userGetApi(token){
    const config = {
                headers: { Authorization: 'Token ' + token }
            }
    return axios.get('https://www.ask2live.me/api/user/read', config)
}


export const getUserInfo = token => dispatch => {

    return userGetApi(token).then(
        (response) => {
            dispatch({ type: USER_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: USER_GET_FAILURE, payload: error });
    })
}
