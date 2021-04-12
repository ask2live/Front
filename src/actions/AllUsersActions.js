import { 
    ALL_USERS_GET_PENDING,
    ALL_USERS_GET_SUCCESS,
    ALL_USERS_GET_FAILURE 
} from "./types";
import axios from 'axios'

function AllUsersGetApi(){
    return axios.get('https://143.248.226.7:8000/api/user/all_read')
}

export const getAllUsersInfo = () => dispatch => {
    console.log('-----getAllUserInfo start-----')
    dispatch({type: ALL_USERS_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return AllUsersGetApi().then(
        (response) => {
            dispatch({ type: ALL_USERS_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: ALL_USERS_GET_FAILURE, payload: error });
    })
}


