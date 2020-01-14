import React, { useEffect, useMemo, useState } from 'react';
import { useRoutes } from 'hookrouter';
import { Provider } from 'react-redux';
import getRouter from '../../router';
import Navbar from '../Navbar';
import NoPageFound from 'src/components/NoPageFound';

import store from '../../redux/store';
import { setAxiosAuthToken } from 'src/utils/setAxiosAuthToken';

import { types } from 'src/redux/reducers/types';
import { api } from 'src/api';


// получить токен из локал-сторидж
if (localStorage.token) {
	setAxiosAuthToken(localStorage.token);
}


const App = () => {

	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!localStorage.token) {
			return;
		}

		api.get('/authUser').then((response) => {
			setUser(response.data);
			store.dispatch({ type: types.USER_LOADED, payload: response.data });
		}).catch(err => {
			localStorage.removeItem('token');
			store.dispatch({ type: types.AUTH_ERROR });
			console.log(err);
		});
	}, [localStorage.token]);

	const role = user ? user.role : null;

	const router = useMemo(() => getRouter(role), [role]);
	const routeResult = useRoutes(router);

	return (
		<Provider store={store}>
			<div>
				<Navbar />
				{routeResult || <NoPageFound />}
			</div>
		</Provider>
	);
};

export default App;
