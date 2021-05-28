import './App.css';
import GetDate from './Components/GetDate';
import GetTime from './Components/GetTime';
import Timer from './Components/Timer';
import ToDo from './Components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {
	return (
		<div className="App">
			<Container>
				<Row>
					<Col>
						<GetDate />
					</Col>
					<Col>
						<GetTime />
					</Col>
				</Row>
				<Row>
					<Col>
						<ToDo />
					</Col>
					<Col>
						<Timer />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
