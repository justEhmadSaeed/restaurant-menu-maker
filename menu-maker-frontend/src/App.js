import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './Routes/Dashboard';
import HomePage from './Routes/HomePage';
import SignIn from './Routes/SignIn';
// import firebase from './firebase/firebase';
import './App.css';
const App = () => {
	const [user, setUser] = useState({});

	// useEffect(() => {
	// 	effect;
	// 	return () => {
	// 		cleanup;
	// 	};
	// }, [user]);
	return (
		<Switch>
			<Route exact path='/signin'>
				<SignIn />
			</Route>
			<Route exact path='/dashboard'>
				<Dashboard />
			</Route>
			<Route path='/'>
				<HomePage />
			</Route>
		</Switch>
	);
};

export default App;
