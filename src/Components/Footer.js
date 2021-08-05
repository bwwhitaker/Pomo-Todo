import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import Button from 'react-bootstrap/Button';

import { Auth } from 'aws-amplify';

async function signOut() {
	try {
		await Auth.signOut();
	} catch (error) {
		console.log('error signing out: ', error);
	}
}

function Footer() {
	return (
		<div>
			<Navbar bg='dark' variant='dark' fixed='bottom' sticky='bottom' className='footer'>
				<Nav>
					<Button variant='secondary' size='sm' onClick={() => signOut()}>
						Sign Out
					</Button>
				</Nav>

				<Navbar.Collapse className='justify-content-end'>
					<Nav>Pomo-Todo v0.1</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Footer;
