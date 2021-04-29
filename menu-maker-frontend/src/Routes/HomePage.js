import React from 'react';
import { Link } from 'react-router-dom';
import Typical from 'react-typical';
const HomePage = () => {
	return (
		<div className='title'>
			<div id='header-image'>
				<div id='title-app-bar'>
					<p>
						<Link to='/signin'>SignIn</Link>
					</p>
					<p>
						<Link to='/signin'>Register</Link>
					</p>
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
		</div>
	);
};

export default HomePage;
