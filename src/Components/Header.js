import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import GetDate from './GetDate';
import GetTime from './GetTime';
import GetCompletedTasks from './GetCompletedTasks';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
	return (
		<Navbar sticky='top' fixed='top' bg='dark' variant='dark' expand='sm' className='bar center'>
			<Navbar.Brand>Todos</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav'>
				<FontAwesomeIcon alt='Expand' aria-label='Exapand Menu' icon={faBars} className='fa-sm' />
			</Navbar.Toggle>

			<Navbar.Collapse className='justify-content-end'>
				<Nav className='me-auto'>
					<Nav.Link>
						<GetTime />
					</Nav.Link>
					<Nav.Link>
						<GetDate />
					</Nav.Link>

					<GetCompletedTasks />
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
