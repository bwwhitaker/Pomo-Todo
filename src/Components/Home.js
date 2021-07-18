import '../App.css';
import React from 'react';
import Timer from './/Timer';
import ToDo from './/ToDo';
import DisplayCurrentTask from './/DisplayCurrentTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home() {
	return (
		<div className='App'>
			<Row>
				<Col md={12} lg={6}>
					<div clasName='scrollable'>
						<ToDo />
					</div>
				</Col>
				<Col md={12} lg={6}>
					<Timer />
					<p></p>
					<DisplayCurrentTask />
				</Col>
			</Row>
		</div>
	);
}

export default Home;
