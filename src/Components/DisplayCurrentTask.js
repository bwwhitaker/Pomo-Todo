import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import '../App.css';
import tomato from '../Media/tomato-small.png';

function DisplayCurrentTask() {
	const [currentTask, setCurrentTask] = useState(
		localStorage.getItem('currentTask')
	);
	const [completedTaskCount, setCompletedTaskCount] = useState(
		localStorage.getItem('completedTaskCount')
	);

	const [show, setShow] = useState('none');

	useEffect(() => {
		const interval = setInterval(() => {
			var displayedTask = JSON.parse(localStorage.getItem('currentTask'));
			setCurrentTask(displayedTask);
		}, 250);
		if (currentTask !== 'Pick a new task.') {
			setShow('block');
		}
		if (currentTask === 'Pick a new task.') {
			setShow('none');
		}
		if (currentTask === `"Pick a new task."`) {
			setShow('none');
		}

		return () => clearInterval(interval);
	});

	function deleteCurrentTask() {
		var resetTask = 'Pick a new task.';
		localStorage.setItem('currentTask', JSON.stringify(resetTask));
		setCurrentTask('Pick a new task.');
		setShow('none');
	}

	function completeCurrentTask() {
		setCompletedTaskCount(Number(completedTaskCount) + 1);
		var taskCount = Number(completedTaskCount) + 1;
		localStorage.setItem('completedTaskCount', taskCount);
		setShow('none');
		deleteCurrentTask();
	}

	function deselectToDo() {
		console.log('sending back');
		console.log(currentTask);
		deleteCurrentTask();
	}

	return (
		<div style={{ display: show }}>
			<Table striped size="sm" variant="dark">
				<tbody>
					<tr>
						<td>
							<img src={tomato} alt="Tomato" />
						</td>
						<td className="left">Current Task:</td>
						<td className="left">{currentTask}</td>
						<td className="right">
							<InputGroup>
								<InputGroup.Prepend>
									<Button
										variant="success"
										sz="sm"
										onClick={completeCurrentTask}
									>
										Complete
									</Button>
								</InputGroup.Prepend>
								<InputGroup.Append>
									<Button
										value={currentTask}
										variant="warning"
										onClick={deselectToDo}
									>
										Deselect
									</Button>
								</InputGroup.Append>
								<InputGroup.Append>
									<Button variant="danger" onClick={deleteCurrentTask}>
										Delete
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default DisplayCurrentTask;
