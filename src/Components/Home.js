import '../App.css';
import React from 'react';
import Timer from './Timer';
import ToDoForm from './ToDoForm';
import DisplayToDoList from './DisplayToDoList';
import DisplayCurrentTask from './DisplayCurrentTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home() {
	return (
		<div className='App'>
			<Row>
				<Col sm={12} md={6}>
					<ToDoForm />
				</Col>
				<Col sm={12} md={6}>
					<Timer />
				</Col>
			</Row>
			<div className='box'>
				<Row className='flex-column-reverse flex-lg-row'>
					<Col md={12} lg={6}>
						<DisplayToDoList />
					</Col>
					<Col md={12} lg={6}>
						<DisplayCurrentTask />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Home;
