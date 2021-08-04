import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';

function Footer() {
	return (
		<Navbar bg='dark' variant='dark' className='justify-content-end' fixed='bottom' sticky='bottom'>
			<Nav className='footer'>Pomo-Todo v0.1</Nav>
		</Navbar>
	);
}

export default Footer;
