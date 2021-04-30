import React from 'react';
import Loader from 'react-loader-spinner';
import './LoadingScreen.css';

const LoadingScreen = () => {
	return (
		<div className='loading'>
			<h1>RESTAURANT MENU MAKER</h1>
			<Loader color='teal' width={130} height={130} type='Puff' />
		</div>
	);
};
export default LoadingScreen;
