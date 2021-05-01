import { Icon } from '@material-ui/core';
import { Email, Phone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import './ViewRestaurant.css';

const ViewRestaurant = ({ user }) => {
	// States
	const [title, setTitle] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [image, setImage] = useState(null);
	const [menuItems, setMenuItems] = useState([]);
	const [loading, setLoading] = useState(true);

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
		<div className='view-restaurant'>
			<img
				id='restaurant-image'
				// style={{ background: `url(${image})` }}
				src={image}
				alt='restaurant'
			/>
			<div>
				<h1>{title}</h1>
			</div>
			<h2>Menu Items</h2>
			<div id='menu-items'>
				{Object.values(menuItems).map((item, key) => (
					<div className='menu-item' key={key}>
						<div className='item-title'>
							<h2>{item.name}</h2>
							<h3>Price: ${item.price}</h3>
						</div>
						<h4>Ingredients</h4>
						<ul>
							{Object.values(item.ingredients).map((ing) => (
								<li key={ing + key}>{ing}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<h2>Contact US</h2>
			<div id='contact-information'>
				<div>
					<Icon>
						<Email />
					</Icon>
					<a href={`mailto:${email}`}>{email}</a>
				</div>
				<div>
					<Icon>
						<Phone />
					</Icon>
					<a href={`tel:${phone}`}>{phone}</a>
				</div>
			</div>
		</div>
	);
};

export default ViewRestaurant;
