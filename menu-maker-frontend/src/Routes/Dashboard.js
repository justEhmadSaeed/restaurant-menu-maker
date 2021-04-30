import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@material-ui/core';
import { ExitToApp, Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import './Dashboard.css';
import LoadingScreen from '../components/LoadingScreen';
import MenuTable from '../components/MenuTable';

const Dashboard = ({ user }) => {
	const [title, setTitle] = useState('');
	const [isChanged, setIsChanged] = useState(false);
	const [loading, setLoading] = useState(true);
	const userDB = firebase.database().ref('users/' + user.uid);

	const onTitleSave = () => {
		userDB.set({
			restaurantName: title,
		});
		setIsChanged(false);
	};
	useEffect(() => {
		firebase
			.database()
			.ref('users/' + user.uid)
			.on('value', (snapshot) => {
				const data = snapshot.val();
				if (data) setTitle(data['restaurantName']);
				console.log(data);
				setLoading(false);
			});
	}, [user.uid]);
	if (loading) return <LoadingScreen />;
	return (
		<div id='dashboard'>
			<div className='title-app-bar'>
				<h1>Dashboard</h1>
				<div className='appbar-buttons'>
					<button className='text-button'>
						<Icon>
							<Home />
						</Icon>
						<Link to='/'>Home</Link>
					</button>
					<button
						onClick={() => firebase.auth().signOut()}
						className='text-button'
					>
						<Icon>
							<ExitToApp />
						</Icon>
						<Link to='/'>Sign Out</Link>
					</button>
				</div>
			</div>
			<div className='restaurant-name'>
				<input
					type='text'
					className='input-text'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
						setIsChanged(true);
					}}
					id='quiz-title'
					placeholder='Restaurant Title'
					autoComplete='off'
				/>
				<div>
					<Button
						disabled={!isChanged || title.length === 0}
						onClick={onTitleSave}
						variant='contained'
					>
						Save
					</Button>
				</div>
			</div>
			<div className='button-class'>
				<Link to='/add-item'>
					<Button variant='contained' color='primary'>
						+ Add Item
					</Button>
				</Link>
			</div>
			<div id='menu-table'>
				<MenuTable user={user} />
			</div>
		</div>
	);
};

export default Dashboard;
