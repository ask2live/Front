import {
  SESSION_GET_PENDING,
  SESSION_GET_SUCCESS,
  SESSION_GET_FAILURE,
  MY_SESSION_GET_PENDING,
  MY_SESSION_GET_SUCCESS,
  MY_SESSION_GET_FAILURE,
} from "./types";

import axios from "axios";

const config = {
  headers: { Authorization: "Token " + localStorage.token },
};

function sessionGetApi() {
  return axios.get("https://www.ask2live.me/api/hole");
}

function userSessionGetApi(token) {
  return axios.get("https://www.ask2live.me/api/user/read/hole", config);
}

export const getSessionInfo = () => (dispatch) => {
  // console.log('-----getSessionInfo start-----')
  dispatch({ type: SESSION_GET_PENDING }); // 요청이 시작되었다는 것을 알림

  // 요청 시작
  return sessionGetApi()
    .then((response) => {
      dispatch({ type: SESSION_GET_SUCCESS, payload: response });
    })
    .catch((error) => {
      dispatch({ type: SESSION_GET_FAILURE, payload: error });
    });
};

export const getUserSessionInfo = () => (dispatch) => {
  dispatch({ type: MY_SESSION_GET_PENDING }); // 요청이 시작되었다는 것을 알림

  // 요청 시작
  return userSessionGetApi()
    .then((response) => {
      dispatch({ type: MY_SESSION_GET_SUCCESS, payload: response });
    })
    .catch((error) => {
      dispatch({ type: MY_SESSION_GET_FAILURE, payload: error });
    });
};

export const deleteSession = (session) => {
  // console.log("-----deleteSession start-----");
  return axios.delete(
    "https://www.ask2live.me/api/hole/delete/" + session.id,
    config
  );
};

export const confirmSession = (session) => {
  // console.log("-----postSessionToReserve start-----");
  const data = {
    data: {},
  };

  return axios.patch(
    "https://www.ask2live.me/api/reservation/hole/" +
      session.id +
      "/hostconfirm",
    data,
    config
  );
};

export const createSession = (data) => {
  return axios.post("https://www.ask2live.me/api/hole/create", data, config);
};

export const updateSession = (holeId, data) => {
  return axios.patch(
    "https://www.ask2live.me/api/hole/update/" + holeId,
    data,
    config
  );
};
