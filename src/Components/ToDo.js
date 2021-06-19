import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

function ToDo() {
	var [tasksToDo, setTasksToDo] = useLocalStorage('todoList', []);
	var [currentTask, setCurrentTask] = useLocalStorage('currentTask', '');

	useEffect(() => {
		if (localStorage.getItem('todoList') === null) {
			var createdOn = new Date().toISOString();
			var initializeList = {
				id: 1,
				todo: 'Nothing to do!',
				created_on: createdOn,
				status: 'scheduled',
			};
			localStorage.setItem('todoList', JSON.stringify(initializeList));
			var retrievedData = localStorage.getItem('todoList');
			var todos = JSON.parse(retrievedData);
			console.log(todos);
			setTasksToDo([(tasksToDo = todos)]);
			console.log(tasksToDo);
		}
	});

	//Thanks to https://usehooks.com/useLocalStorage/
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

	function timerStart() {
		if (inputEl.current.value === '') {
		} else {
			const retrievedToDos = localStorage.getItem('todoList');
			var parsedRetrievedToDos = JSON.parse(retrievedToDos);
			console.log('timer start');
			console.log(parsedRetrievedToDos);
			var createdOn = new Date().toISOString();
			console.log(createdOn);
			var keyGen = parsedRetrievedToDos.length + 1;
			console.log(keyGen);
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				id: keyGen,
				todo: inputEl.current.value,
				created_on: createdOn,
				status: 'working',
			};
			setTasksToDo([...tasksToDo, newItem]);
			const freshretrievedToDos = localStorage.getItem('todoList');
			var freshparsedRetrievedToDos = JSON.parse(freshretrievedToDos);
			console.log(freshparsedRetrievedToDos);
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	function scheduleForLater() {
		if (inputEl.current.value === '') {
		} else {
			const retrievedToDos = localStorage.getItem('todoList');
			var parsedRetrievedToDos = JSON.parse(retrievedToDos);
			console.log('schedule for later');
			console.log(parsedRetrievedToDos);
			var createdOn = new Date().toISOString();
			console.log(createdOn);
			var keyGen = parsedRetrievedToDos.length + 1;
			console.log(keyGen);
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				id: keyGen,
				todo: inputEl.current.value,
				created_on: createdOn,
				status: 'scheduled',
			};
			setTasksToDo([...tasksToDo, newItem]);
			const freshretrievedToDos = localStorage.getItem('todoList');
			var freshparsedRetrievedToDos = JSON.parse(freshretrievedToDos);
			console.log(freshparsedRetrievedToDos);
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	const inputEl = useRef(null);

	function removeTask(taskIdentifier) {
		var newTaskList = JSON.parse(localStorage.getItem('todoList'));
		var keyOfTask = newTaskList.findIndex(function (task) {
			return task.created_on === taskIdentifier;
		});
		if (keyOfTask > -1) {
			newTaskList.splice(keyOfTask, 1);
		}
		setTasksToDo(newTaskList);
		inputEl.current.focus();
		inputEl.current.value = '';
	}

	return (
		<div>
			<InputGroup>
				<FormControl
					ref={inputEl}
					placeholder="Task"
					aria-label="Task Input"
					aria-describedby="basic-addon2"
					autoFocus={true}
				/>
				<InputGroup.Append>
					<Button variant="outline-secondary" onClick={timerStart}>
						Start
					</Button>

					<Button variant="outline-secondary" onClick={scheduleForLater}>
						Schedule
					</Button>
				</InputGroup.Append>
			</InputGroup>
			<div key="toDoList">
				{tasksToDo.length === 1 && <p>Looks like you've got nothing ToDo!</p>}
				<Table bordered striped size="sm" variant="dark">
					{tasksToDo
						.map((todo) => (
							<tbody>
								<tr>
									<td>{todo.todo}</td>
									<td>
										<InputGroup>
											<InputGroup.Prepend>
												<Button
													variant="success"
													sz="sm"
													value={todo.created_on}
													onClick={() => console.log(todo.created_on)}
												>
													Start
												</Button>
											</InputGroup.Prepend>
											<InputGroup.Append>
												<Button
													variant="danger"
													onClick={() => removeTask(todo.created_on)}
												>
													Remove
												</Button>
											</InputGroup.Append>
										</InputGroup>
									</td>
								</tr>
							</tbody>
						))
						.slice(1)}
				</Table>
			</div>
		</div>
	);
}

export default ToDo;
