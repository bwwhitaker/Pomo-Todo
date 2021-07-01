import React from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import ListGroup from 'react-bootstrap/ListGroup';

function ToDoCard() {
	return (
		<Card className="card">
			<Card.Body>
				<ListGroup variant="flush" horizontal={'lg'}>
					<ListGroup.Item>Drag Icon</ListGroup.Item>
					<ListGroup.Item>Todo Name</ListGroup.Item>
					<ListGroup.Item>Due By</ListGroup.Item>
					<ListGroup.Item>Category</ListGroup.Item>
					<ListGroup.Item>Buttons</ListGroup.Item>
				</ListGroup>
			</Card.Body>
		</Card>
	);
}

export default ToDoCard;
