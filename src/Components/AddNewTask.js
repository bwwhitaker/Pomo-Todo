import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

function AddNewTask() {
	const inputEl = useRef(null);

	return (
		<Col>
			<p>
				<InputGroup>
					<FormControl
						ref={inputEl}
						placeholder='Task'
						aria-label='Task Input'
						aria-describedby='basic-addon2'
						autoFocus={true}
					/>
					<InputGroup.Append>
						<Button variant='outline-secondary' onClick={null}>
							Begin
						</Button>
						<Button variant='outline-secondary' onClick={null}>
							Schedule
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</p>
		</Col>
	);
}

export default AddNewTask;
