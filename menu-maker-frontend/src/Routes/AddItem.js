import {
	Button,
	IconButton,
	InputAdornment,
	TextField,
} from '@material-ui/core';
import { AddBox, DeleteForever } from '@material-ui/icons';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import './AddItem.css';

const AddItem = ({ user }) => {
	const [loading, setLoading] = useState('stop');
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [ingredientsArray, setIngredientsArray] = useState([]);
	const [ingredientName, setingredientName] = useState('');

	const addIngredient = () => {
		if (ingredientName.length > 0 && ingredientsArray.length < 5) {
			const temp = [...ingredientsArray];
			temp.push(ingredientName);
			setIngredientsArray(temp);
			setingredientName('');
		}
	};
	const deleteIngredient = (index) => {
		const temp = ingredientsArray.filter((ind, i) => i !== index);
		setIngredientsArray(temp);
	};
	// Send Data to backend
	const onSubmitItem = async () => {
		setLoading('start');
		const result = await fetch('http://localhost:8000/api/menu/set', {
			method: 'POST',
			body: JSON.stringify({
				uid: user.uid,
				name,
				price,
				ingredients: ingredientsArray,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await result.json();
		if (!data.error) setLoading('redirect');
		else setLoading('stop');
	};

	if (loading === 'start') return <LoadingScreen />;
	if (loading === 'redirect')
		return <Redirect push to='/dashboard' />;

	return (
		<div id='add-item'>
			<div className='title-app-bar'>
				<h1>MENU ITEM</h1>
			</div>
			<div className='card'>
				<div className='input-bars'>
					<TextField
						margin='normal'
						type='text'
						variant='outlined'
						label='Item Name'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth
						autoComplete='off'
					/>
					<TextField
						margin='normal'
						variant='outlined'
						label='Price'
						fullWidth
						type='number'
						value={price}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>$</InputAdornment>
							),
						}}
					/>
				</div>
				<h2>Ingredients</h2>
				<div className='add-ingredient'>
					<TextField
						type='text'
						variant='filled'
						label='Ingredient'
						value={ingredientName}
						onChange={(e) => {
							setingredientName(e.target.value);
						}}
						autoComplete='off'
						size='small'
					/>
					<IconButton onClick={addIngredient}>
						<AddBox />
					</IconButton>
				</div>
				<div className='ingredients'>
					{ingredientsArray.map((ing, key) => (
						<div className='ingredient-item' key={key}>
							<p>{ing}</p>
							<IconButton onClick={() => deleteIngredient(key)}>
								<DeleteForever />
							</IconButton>
						</div>
					))}
				</div>
			</div>
			<div className='button-class'>
				<Button
					variant='contained'
					disabled={
						name.length === 0 ||
						price === 0 ||
						ingredientsArray.length === 0
					}
					onClick={onSubmitItem}
				>
					Add Item
				</Button>
			</div>
		</div>
	);
};

export default AddItem;
