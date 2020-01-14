import React from 'react';
import { Layout } from 'antd';
import { A, navigate } from 'hookrouter';
import { useIsAuth, useCurrentUser } from 'src/redux/reducers/authReducer';
import { setAxiosAuthToken } from 'src/utils/setAxiosAuthToken';
import { userRoles } from 'src/common/userRoles';

import './navbar.css';

const Navbar = () => {

  const isAuth = useIsAuth();
  const currentUser = useCurrentUser();
  const isAdmin = currentUser && currentUser.role === userRoles.admin;

  const logout = () => {
    setAxiosAuthToken('');
    navigate('/login');
  };

  return (
    <Layout>
      <Layout.Header className="custom">
        <A href="/" className="navItem" >Главная</A>
        {isAdmin && (<A href="/admin" className="navItem" >Управление</A>)}
        {isAuth && (<a href="#" onClick={logout} className="navItem" >Выход</a>)}
        {!isAuth && (<A href="/login" className="navItem" >Войти</A>)}
      </Layout.Header>
    </Layout>
  );
};

export default Navbar;
