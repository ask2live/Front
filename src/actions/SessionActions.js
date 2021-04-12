import {
    SESSION_GET_PENDING,
    SESSION_GET_SUCCESS,
    SESSION_GET_FAILURE,
    MY_SESSION_GET_PENDING,
    MY_SESSION_GET_SUCCESS,
    MY_SESSION_GET_FAILURE,
  } from './types';

import axios from 'axios'

function sessionGetApi(){
    return axios.get('https://www.ask2live.me/api/hole')
}

function userSessionGetApi(token){
    const config = {
        headers: {Authorization: 'Token ' + token}
    }
    return axios.get('https://www.ask2live.me/api/user/read/hole',
        config
    )
}

export const getSessionInfo = () => dispatch => {
    // console.log('-----getSessionInfo start-----')
    dispatch({type: SESSION_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return sessionGetApi().then(
        (response) => {
            dispatch({ type: SESSION_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: SESSION_GET_FAILURE, payload: error });
    })
}

export const getUserSessionInfo = token => dispatch => {
    dispatch({type: MY_SESSION_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return userSessionGetApi(token).then(
        (response) => {
            dispatch({ type: MY_SESSION_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: MY_SESSION_GET_FAILURE, payload: error });
    })
}
