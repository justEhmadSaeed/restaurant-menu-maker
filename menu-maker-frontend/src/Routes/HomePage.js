import { Icon } from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Typical from 'react-typical';
import firebase from '../firebase/firebase';

const HomePage = ({ user }) => {
	return (
		<div id='header-image'>
			<div className='title-app-bar'>
				{user.uid ? (
					<>
						<button className='text-button'>
							<Icon>
								<Person />
							</Icon>
							<Link to='/dashboard'>My Account</Link>
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
					</>
				) : (
					<>
						<p>
							<Link to='/signin'>Sign In</Link>
						</p>
						<p>
							<Link to='/signin'>Register</Link>
						</p>
					</>
				)}
			</div>
			<Typical
				steps={[
					'Restaurant Menu Maker!',
					2000,
					'Restaurant Menu Builder!',
					2000,
					'Restaurant Menu Creator!',
					2000,
				]}
				loop={Infinity}
				wrapper='h1'
			/>
		</div>
	);
};

export default HomePage;
