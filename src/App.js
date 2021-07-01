import './App.css';
import React from 'react';
import GetDate from './Components/GetDate';
import GetTime from './Components/GetTime';
import GetCompletedTasks from './Components/GetCompletedTasks';
import Timer from './Components/Timer';
import ToDo from './Components/ToDo';
import DisplayCurrentTask from './Components/DisplayCurrentTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToDoCard from './Components/ToDoCard';

function App() {
	return (
		<div className="App">
			<Row>
				<Col xs={3} md={2}>
					<GetDate />
				</Col>
				<Col xs={5} md={3}>
					<GetTime />
				</Col>
				<Col xs={4} md={7}>
					<GetCompletedTasks />
				</Col>
			</Row>
			<Row>
				<Col md={12} lg={6}>
					<ToDo />
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

export default App;
