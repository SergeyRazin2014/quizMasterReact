import React from 'react';
import { Layout } from 'antd';
import { A, navigate } from 'hookrouter';
//-
import './navbar.css';
import { setAxiosAuthToken } from 'src/utils/setAxiosAuthToken';

const Navbar = () => {

  const { Header } = Layout;

  const logout = () => {
    setAxiosAuthToken('');
    navigate('/login');
  };

  return (
    <Layout>
      <Header className="custom">
        <A href="/" className="navItem" >Главная</A>
        <A href="/admin" className="navItem" >Управление</A>
        <a href="#" onClick={logout} className="navItem" >Выход</a>
      </Header>
    </Layout>
  );
};

export default Navbar;
