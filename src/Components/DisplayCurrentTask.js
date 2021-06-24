import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

function DisplayCurrentTask() {
	const [currentTask, setCurrentTask] = useState(
		localStorage.getItem('currentTask')
	);
	const [completedTaskCount, setCompletedTaskCount] = useState(
		localStorage.getItem('completedTaskCount')
	);

	const [show, setShow] = useState('none');

	var [tasksToDo, setTasksToDo] = useLocalStorage('todoList', []);

	useEffect(() => {
		const interval = setInterval(() => {
			var displayedTask = JSON.parse(localStorage.getItem('currentTask'));
			setCurrentTask(displayedTask);
		}, 250);
		if (currentTask === 'Pick a new task.') {
			setShow('none');
		}
		if (currentTask === `"Pick a new task."`) {
			setShow('none');
		}
		if (currentTask !== 'Pick a new task.') {
			setShow('block');
		}
		return () => clearInterval(interval);
	});

	function useLocalStorage(key, initialValue) {
		// State to store our value
		// Pass initial state function to useState so logic is only executed once
		const [storedValue, setStoredValue] = useState(() => {
			try {
				// Get from local storage by key
				const item = window.localStorage.getItem(key);
				// Parse stored json or if none return initialValue
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				// If error also return initialValue
				console.log(error);
				return initialValue;
			}
		});
		// Return a wrapped version of useState's setter function that ...
		// ... persists the new value to localStorage.
		const setValue = (value) => {
			try {
				// Allow value to be a function so we have same API as useState
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				// Save state
				setStoredValue(valueToStore);
				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				// A more advanced implementation would handle the error case
				console.log(error);
			}
		};
		return [storedValue, setValue];
	}

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

	function deselectToDo(taskNameToSendBack) {
		setShow('none');
		const retrievedToDos = localStorage.getItem('todoList');
		var parsedRetrievedToDos = JSON.parse(retrievedToDos);
		console.log('return to schedule');
		console.log(parsedRetrievedToDos);
		var createdOn = new Date().toISOString();
		console.log(createdOn);

		const newItem = {
			todo: taskNameToSendBack,
			created_on: createdOn,
			status: 'scheduled',
		};
		setTasksToDo([...tasksToDo, newItem]);
		const freshretrievedToDos = localStorage.getItem('todoList');
		var freshparsedRetrievedToDos = JSON.parse(freshretrievedToDos);
		console.log(freshparsedRetrievedToDos);
		deleteCurrentTask();
	}

	return (
		<div>
			<Table bordered striped size="sm" variant="dark">
				<tbody>
					<tr>
						<td>Current Task:</td>
						<td>{currentTask}</td>
						<div style={{ display: show }}>
							<td>
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
											onClick={deselectToDo(currentTask)}
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
						</div>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default DisplayCurrentTask;
