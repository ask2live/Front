import {
    ON_MESSAGES_VALUE_CHANGE,
    ON_MESSAGES_READING,
    ON_MESSAGES_INIT,
    ON_MESSAGES_READ
  } from '../actions/types';
  const INITIAL_STATE = {
    messages: [],
    loading: false,
    error: '',
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ON_MESSAGES_VALUE_CHANGE:
        return { ...state, ...action.payload };
      case ON_MESSAGES_READING:
        return { ...state, loading: true, error: '' };
      case ON_MESSAGES_INIT:
        return { ...state, ...action.payload, loading: false, error: '' };
      case ON_MESSAGES_READ:
        let tmp = [...state.messages, ...action.payload.messages];
        if (tmp.length >= 21){
          tmp.shift()
        }
        return { ...state, messages: tmp, loading: false, error: '' };
      default:
        return state;
    }
  };