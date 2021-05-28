import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function ToDo() {
	function timerStart() {
		console.log('timer start');
	}

	function scheduleForLater() {
		console.log('schedule for later');
	}

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			e.preventDefault();
			if (e.metaKey && e.code === 'Enter') {
				timerStart();
				console.log('yikes torpedo!');
			}
			if (e.shiftKey && e.code === 'Enter') {
				scheduleForLater();
				console.log('hello torpedo!');
			}
		});
		document.removeEventListener('keydown', []);
	});

	return (
		<div>
			<p>I'm a ToDo Component</p>
			<InputGroup>
				<FormControl
					placeholder="Task"
					aria-label="Task Input"
					aria-describedby="basic-addon2"
				/>
				<InputGroup.Append>
					<Button variant="outline-secondary">Start</Button>
					<Button variant="outline-secondary">Schedule</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
}

export default ToDo;
