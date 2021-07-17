import React from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const sampleTodo = {
	todo: 'Eat Pie',
	createdOn: 'June 1, 2021',
	status: 'scheduled',
	category: 'Food',
	dueBy: 'August 1, 2021',
	order: 1,
	notes: 'We need to get a real good pie.',
};

function ToDoCard() {
	return (
		<div>
			<div class='card bg-c-blue todo-card'>
				<div className='card-block'>
					<Card.Title>
						<span className='f-left'>{sampleTodo.todo}</span>
						<span className='f-right'>
							<InputGroup>
								<InputGroup.Prepend>
									<Button variant='success'>
										<FontAwesomeIcon alt='Select' aria-label='Select' icon={faLaptopCode} />
									</Button>
								</InputGroup.Prepend>

								<InputGroup.Append>
									<Button variant='danger'>
										<FontAwesomeIcon alt='Delete' aria-label='Delete' icon={faTrashAlt} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</span>
					</Card.Title>
					<Card.Body>
						<Row className='cardbody-top-padding'>
							<Col sm={8}>
								<span className='f-left'> Due: {sampleTodo.dueBy}</span>
							</Col>
							<Col sm={4}>
								<span className='f-right'>Category: {sampleTodo.category}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left'>{sampleTodo.notes}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left created-info'>Created: {sampleTodo.createdOn}</span>
							</Col>
						</Row>
					</Card.Body>
				</div>
			</div>

			<div class='card bg-c-yellow todo-card'>
				<div className='card-block'>
					<Card.Title>
						<span className='f-left'>{sampleTodo.todo}</span>
						<span className='f-right'>
							<InputGroup>
								<InputGroup.Prepend>
									<Button variant='success'>
										<FontAwesomeIcon alt='Select' aria-label='Select' icon={faLaptopCode} />
									</Button>
								</InputGroup.Prepend>
								<InputGroup.Append>
									<Button variant='danger'>
										<FontAwesomeIcon alt='Delete' aria-label='Delete' icon={faTrashAlt} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</span>
					</Card.Title>
					<Card.Body>
						<Row className='cardbody-top-padding'>
							<Col sm={8}>
								<span className='f-left'> Due: {sampleTodo.dueBy}</span>
							</Col>
							<Col sm={4}>
								<span className='f-right'>Category: {sampleTodo.category}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left'>{}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left created-info'>Created: {sampleTodo.createdOn}</span>
							</Col>
						</Row>
					</Card.Body>
				</div>
			</div>
			<div class='card bg-c-red todo-card'>
				<div className='card-block'>
					<Card.Title>
						<span className='f-left'>{sampleTodo.todo}</span>
						<span className='f-right'>
							<InputGroup>
								<InputGroup.Prepend>
									<Button variant='success'>
										<FontAwesomeIcon alt='Select' aria-label='Select' icon={faLaptopCode} />
									</Button>
								</InputGroup.Prepend>

								<InputGroup.Append>
									<Button variant='danger'>
										<FontAwesomeIcon alt='Delete' aria-label='Delete' icon={faTrashAlt} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</span>
					</Card.Title>
					<Card.Body>
						<Row className='cardbody-top-padding'>
							<Col sm={8}>
								<span className='f-left'> Due: {sampleTodo.dueBy}</span>
							</Col>
							<Col sm={4}>
								<span className='f-right'>Category: {sampleTodo.category}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left'>{}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left created-info'>Created: {sampleTodo.createdOn}</span>
							</Col>
						</Row>
					</Card.Body>
				</div>
			</div>
		</div>
	);
}

export default ToDoCard;
