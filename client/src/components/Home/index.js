import React from 'react';
import { Button } from 'antd';
import { A, navigate } from 'hookrouter';
import { useIsAuth, useCurrentUser } from 'src/redux/reducers/authReducer';

import 'src/components/Home/home.css';
import homeImg from 'src/assets/img/doctor.png';

const Home = () => {

	const isAuth = useIsAuth();
	
	

	const handleClick = () => {
		navigate('/selectQuiz');
	};

	

	return (
		<div className="home-block-wrapper">
			<div className="textBlock">
				<h1>ДОКТОР ОНЛАЙН</h1>
				<p>Данный сервис поможет Вам разобраться</p>
				<p> в трудностях связанных с вашим состоянием, </p>
				<p> с болезнями ваших детей и ваших близких.</p>
				<br />
				<p>Совет дается только после внимательного &ldquo;разговора&ldquo;,</p>
				<p> который проводит с вами диагностическая система.</p>
				<p> Ваш вопрос уточняется, и вы получаете ответ.</p>
				<br />
				{isAuth && (<Button type="primary" onClick={handleClick} >НАЧАТЬ ТЕСТИРОВАНИЕ</Button>)}
				{!isAuth && (<p><A href="/register" >Зарегистрируйтесь</A> или <A href="/login" >войдите</A></p>)}
			</div>
			<div className="home-img-wrapper">
				<img src={homeImg} alt="doctor" />
			</div>
		</div>
	);
};

export default Home;
