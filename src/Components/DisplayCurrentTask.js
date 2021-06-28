import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import '../App.css';
import tomato from '../Media/tomato-small.png';
import { TaskStore } from '../TaskStore';

function DisplayCurrentTask() {
	const [currentTask, setCurrentTask] = useState(
		localStorage.getItem('currentTask')
	);

	const showCurrentTask = TaskStore.useState((s) => s.showCurrentTask);

	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);

	function deleteCurrentTask() {
		var resetTask = 'Pick a new task.';
		localStorage.setItem('currentTask', JSON.stringify(resetTask));
		setCurrentTask('Pick a new task.');
		TaskStore.update((s) => {
			s.showCurrentTask = 'none';
		});
		localStorage.setItem('showCurrentTask', JSON.stringify('none'));
	}

	function completeCurrentTask() {
		TaskStore.update((s) => {
			s.completedTaskCount += 1;
		});
		deleteCurrentTask();
		localStorage.setItem('completedTaskCount', completedTaskCount + 1);
	}

	function deselectToDo() {
		console.log('sending back');
		console.log(currentTask);
		deleteCurrentTask();
	}

	return (
		<div style={{ display: showCurrentTask }}>
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
