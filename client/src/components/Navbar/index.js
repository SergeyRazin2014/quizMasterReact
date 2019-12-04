import React from 'react';
import { Layout } from 'antd';
import { A } from 'hookrouter';
//-
import './navbar.css';

const Navbar = () => {

  const { Header } = Layout;

  return (
    <Layout>
      <Header className="custom">
        <A href="/" className="navItem" >Главная</A>
        <A href="/categories" className="navItem" >Категории</A>
        <A href="/quiz" className="navItem" >Тестирование</A>
      </Header>
    </Layout>
  );
};

export default Navbar;
