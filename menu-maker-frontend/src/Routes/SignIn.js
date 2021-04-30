import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';

const SignIn = () => {
	const uiConfig = {
		signInflow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	};
	return (
		<div id='signin-container'>
			<div className='title-app-bar'>
				<p>
					<Link to='/dashboard'>Home Page</Link>
				</p>
			</div>
			<div id='signin-body'>
				<div id='login-card'>
					<label className='login-label'>
						<b>RESTAURANT MENU MAKER</b>
					</label>
					<StyledFirebaseAuth
						borderRadius='40px'
						uiConfig={uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
