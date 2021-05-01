import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, TextField } from '@material-ui/core';
import { ExitToApp, Home, Web } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import './Dashboard.css';
import LoadingScreen from '../components/LoadingScreen';
import MenuTable from '../components/MenuTable';

const Dashboard = ({ user }) => {
	// States
	const [title, setTitle] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [image, setImage] = useState(null);
	const [menuItems, setMenuItems] = useState([]);
	const [isChanged, setIsChanged] = useState(false);
	const [loading, setLoading] = useState(true);

	const onRestaurantInfoSave = async () => {
		const result = await fetch('http://localhost:8000/api/rest/set', {
			method: 'POST',
			body: JSON.stringify({
				uid: user.uid,
				name: title,
				email,
				phone,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!result.error) setIsChanged(false);
	};
	// Upload Image to the firebase storage and save its URL in database
	const onImageUpload = (event) => {
		const img = event.target.files[0];
		if (img) {
			const uploadImage = firebase
				.storage()
				.ref(`images/${user.uid}`)
				.put(img);

			uploadImage.on(
				'state-changed',
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					firebase
						.storage()
						.ref(`images/${user.uid}`)
						.getDownloadURL()
						.then((url) => {
							firebase.database().ref(`users/${user.uid}`).update({
								image: url,
							});
							setImage(url);
						});
				}
			);
		}
	};
	// Fetch Data from Backend on Page Load
	useEffect(() => {
		const fetchRestInfo = async () => {
			const result = await fetch(
				'http://localhost:8000/api/rest/get',
				{
					method: 'POST',
					body: JSON.stringify({
						uid: user.uid,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await result.json();
			if (!data.error && data['restaurantName']) {
				setTitle(data['restaurantName']);
				setEmail(data.contactInfo['email']);
				setPhone(data.contactInfo['phone']);
			}
			if (data['image']) setImage(data['image']);
			if (data['menu']) setMenuItems(data['menu']);
			setLoading(false);
		};
		fetchRestInfo();
	}, [user.uid]);

	if (loading) return <LoadingScreen />;
	return (
		<div id='dashboard'>
			<div className='title-app-bar'>
				<div>
					<h1>Dashboard</h1>
				</div>
				<div className='appbar-buttons'>
					<button className='text-button'>
						<Icon>
							<Home />
						</Icon>
						<Link to='/'>Home</Link>
					</button>
					<button className='text-button'>
						<Icon>
							<Web />
						</Icon>
						<Link to='/view'>View Restaurant</Link>
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
			<TextField
				type='text'
				className='input-text center-align'
				value={title}
				variant='outlined'
				margin='normal'
				onChange={(e) => {
					setTitle(e.target.value);
					setIsChanged(true);
				}}
				label='Restaurant Name'
				autoComplete='off'
			/>
			<TextField
				type='email'
				className='input-text center-align'
				value={email}
				variant='outlined'
				margin='normal'
				onChange={(e) => {
					setEmail(e.target.value);
					setIsChanged(true);
				}}
				label='Email Address'
				autoComplete='off'
			/>
			<TextField
				type='text'
				className='input-text center-align'
				value={phone}
				variant='outlined'
				margin='normal'
				onChange={(e) => {
					setPhone(e.target.value);
					setIsChanged(true);
				}}
				label='Phone No.'
				autoComplete='off'
			/>
			<Button
				disabled={
					!isChanged ||
					title.length === 0 ||
					email.length === 0 ||
					phone.length === 0
				}
				onClick={onRestaurantInfoSave}
				variant='contained'
				className='center-align'
			>
				Save
			</Button>
			<div className='center-align'>
				<Input
					className='center-align'
					type='file'
					onChange={onImageUpload}
				/>
			</div>
			{image ? (
				<img
					className='image center-align'
					src={image}
					alt='restaurant'
				/>
			) : (
				<></>
			)}
			<div className='button-class'>
				<Link to='/add-item'>
					<Button variant='contained' color='primary'>
						+ Add Item
					</Button>
				</Link>
			</div>
			<div id='menu-table'>
				<MenuTable
					user={user}
					menuItems={menuItems}
					setMenuItems={setMenuItems}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
