import './App.css';
import GetDate from './Components/GetDate';
import GetTime from './Components/GetTime';
import GetCompletedTasks from './Components/GetCompletedTasks';
import Timer from './Components/Timer';
import ToDo from './Components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DisplayCurrentTask from './Components/DisplayCurrentTask';

function App() {
	return (
		<div className="App">
			<Row>
				<Col>
					<GetDate />
				</Col>
				<Col>
					<GetTime />
				</Col>
				<Col>
					<GetCompletedTasks />
				</Col>
			</Row>
			<Row>
				<Col>
					<ToDo />
				</Col>
				<Col>
					<Timer />
					<p></p>
					<DisplayCurrentTask />
				</Col>
			</Row>
		</div>
	);
}

export default App;
