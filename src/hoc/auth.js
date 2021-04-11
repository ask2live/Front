import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getUserInfo} from '../actions/UserActions';

export default (SpecialComponent, option, adminRoute=null) => {

  /* 
     ��)  option: null -> ������ ������ ������ ������ (home)
                 true -> �α����� ������ ������ ������ ������
                 false -> �α����� ������ ������ �Ұ����� ������
                 
        false�� �������� �α����� ������ ������ �� �ְ� ¥�� �ȵ�����, Ȥ�ó� �������� ���� �Ʒ� �ڵ� ��� �α��������� ���Եȴ�.
        ���� ���� �������� �������ҵ�??
  */
  const AuthenticateCheck = (props) => {

    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
      if (!isLoggedIn && option) {
        props.history.push({
            pathname : "/login",
            before : props.location.pathname + props.location.search  
        });
      }
    }, []);

    return (
      <SpecialComponent routerInfo={props}/>
    )

  };
  return AuthenticateCheck;
};