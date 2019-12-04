import React from 'react';
import { useRoutes } from 'hookrouter';
import { Provider } from 'react-redux';
import router from '../../router';
import Navbar from '../Navbar';

import store from '../../redux/store';

const App = () => {
	const routeResult = useRoutes(router);

	return (
		<Provider store={store}>
			<div>
				<Navbar />
				{routeResult}
			</div>
		</Provider>
	);
};

export default App;
