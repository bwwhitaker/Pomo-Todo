import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';

function Footer() {
	return (
		<div>
			<Navbar bg='dark' variant='dark' fixed='bottom' sticky='bottom' className='footer'>
				<Nav></Nav>

				<Navbar.Collapse className='justify-content-end'>
					<Nav>Pomo-Todo v0.1</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Footer;
