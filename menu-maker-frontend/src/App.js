import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from './Routes/Dashboard';
import HomePage from './Routes/HomePage';
import SignIn from './Routes/SignIn';
import firebase from './firebase/firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import AddItem from './Routes/AddItem';
import ViewRestaurant from './Routes/ViewRestaurant';

const App = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		firebase.auth().onAuthStateChanged((user) => {
			if (user && isMounted) {
				setUser({
					uid: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
					email: firebase.auth().currentUser.email,
				});
				console.log('User Logged In');
			} else {
				console.log('User Signed Out');
				setUser({});
			}
			console.log('auth change');
			if (isMounted) setLoading(false);
		});
		return () => (isMounted = false);
	}, [setUser]);
	if (loading) return <LoadingScreen />;
	return !user.uid ? (
		<Switch>
			<Route exact path='/signin'>
				<SignIn />
			</Route>
			<Route path='/'>
				<HomePage user={user} />
			</Route>
		</Switch>
	) : (
		<Switch>
			<Route exact path='/dashboard'>
				<Dashboard user={user} />
			</Route>
			<Route exact path='/add-item'>
				<AddItem user={user} />
			</Route>
			<Route exact path='/view'>
				<ViewRestaurant user={user} />
			</Route>
			<Route path='/'>
				<HomePage user={user} />
			</Route>
		</Switch>
	);
};

export default App;
