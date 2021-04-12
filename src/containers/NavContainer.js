import React, { Component, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { combineReducers } from 'redux';
import { NavOfGuest, NavOfUser } from '../components/Nav';
import LoginPage from '../components/onBoard/LoginPage';

/* async, await 사용하면 데이터는 가져와지나
Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
에러 발생
*/
const NavContainer = () => {
    const user = useSelector(state => state.user);
    const history = useHistory()

    if (user.data.detail){
        return <NavOfUser user={user}/>
    }else{
        return <NavOfGuest user={user}/> //지금은 사용하지 않음
    }
        
};

export default NavContainer

