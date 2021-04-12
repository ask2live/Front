import {
    USER_GET_PENDING,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    GIVEUSER
} from './types';

import axios from 'axios'

function userGetApi(token){
    const config = {
                headers: { Authorization: 'Token ' + token }
            }
    return axios.get('https://143.248.226.7:8000/api/user/read', config)
}

export const giveUser = (given) => ({ type : GIVEUSER, user : given });

export const getUserInfo = token => dispatch => {
    console.log('-----getUserInfo start-----')
    // dispatch({type: USER_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return userGetApi(token).then(
        (response) => {
            dispatch({ type: USER_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: USER_GET_FAILURE, payload: error });
    })
}
