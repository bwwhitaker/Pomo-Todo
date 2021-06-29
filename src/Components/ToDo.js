import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import tomato from '../Media/tomato-small.png';
import '../App.css';
import { TaskStore } from '../TaskStore';

function ToDo() {
	const todoListReadyToRender = JSON.parse(
		TaskStore.useState((s) => s.todoListReady)
	);
	const tasksToDo = JSON.parse(TaskStore.useState((s) => s.todoList));

	const showCurrent = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));

	useEffect(() => {
		if (localStorage.length > 0) {
			console.log('got it');
			console.log(todoListReadyToRender);
			console.log(showCurrent);
		} else {
			var createdOn = new Date().toISOString();
			var initializeList = [
				{
					todo: 'Nothing to do!',
					created_on: createdOn,
					status: 'scheduled',
				},
			];
			localStorage.setItem('todoList', JSON.stringify(initializeList));
			TaskStore.update((s) => {
				s.todoList = JSON.stringify(initializeList);
			});
			localStorage.setItem('completedTaskCount', 0);
			TaskStore.update((s) => {
				s.completedTaskCount = 0;
			});
			localStorage.setItem('todoListReady', JSON.stringify('yes'));
			TaskStore.update((s) => {
				s.todoListReady = JSON.stringify('yes');
			});
			localStorage.setItem('showCurrentTask', JSON.stringify('none'));
			TaskStore.update((s) => {
				s.showCurrentTask = JSON.stringify('none');
			});
		}
	});

	function setAsCurrentTask() {
		if (inputEl.current.value === '') {
		} else {
			TaskStore.update((s) => {
				s.currentTask = JSON.stringify(inputEl.current.value);
			});
			TaskStore.update((s) => {
				s.showCurrentTask = JSON.stringify('block');
			});
			localStorage.setItem('showCurrentTask', JSON.stringify('block'));
			localStorage.setItem(
				'currentTask',
				JSON.stringify(inputEl.current.value)
			);
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	function setScheduledTaskAsCurrentTask(taskName) {
		TaskStore.update((s) => {
			s.currentTask = JSON.stringify(taskName);
		});
		TaskStore.update((s) => {
			s.showCurrentTask = JSON.stringify('block');
		});
		localStorage.setItem('showCurrentTask', JSON.stringify('block'));
		localStorage.setItem('currentTask', JSON.stringify(taskName));
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

			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				todo: inputEl.current.value,
				created_on: createdOn,
				status: 'scheduled',
			};
			//setTasksToDo([...tasksToDo, newItem]);
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
		//setTasksToDo(newTaskList);
		inputEl.current.focus();
		inputEl.current.value = '';
	}

	function startScheduledForLaterTask(taskIdentifier, taskName) {
		console.log(taskIdentifier);
		console.log(taskName);
		setScheduledTaskAsCurrentTask(taskName);
		var newTaskList = JSON.parse(localStorage.getItem('todoList'));
		var keyOfTask = newTaskList.findIndex(function (task) {
			return task.created_on === taskIdentifier;
		});
		if (keyOfTask > -1) {
			newTaskList.splice(keyOfTask, 1);
		}
		//setTasksToDo(newTaskList);
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
					<Button variant="outline-secondary" onClick={setAsCurrentTask}>
						Begin
					</Button>
					<Button variant="outline-secondary" onClick={scheduleForLater}>
						Schedule
					</Button>
				</InputGroup.Append>
			</InputGroup>
			<p></p>
			{todoListReadyToRender === 'yes' && (
				<div key="toDoList">
					{tasksToDo.length === 1 && (
						<Table striped size="sm" variant="dark">
							<tbody>
								<tr>
									<td>Looks like you've got nothing ToDo!</td>
								</tr>
							</tbody>
						</Table>
					)}
					<Table striped size="sm" variant="dark">
						{tasksToDo
							.map((todo) => (
								<tbody>
									<tr>
										<td>
											<img src={tomato} alt="Tomato" />
										</td>
										<td className="left">{todo.todo}</td>
										<td className="right">
											<InputGroup className="right">
												<InputGroup.Prepend>
													<Button
														variant="success"
														sz="sm"
														value={todo.created_on}
														onClick={() =>
															startScheduledForLaterTask(
																todo.created_on,
																todo.todo
															)
														}
													>
														Select
													</Button>
												</InputGroup.Prepend>
												<InputGroup.Append>
													<Button
														variant="danger"
														onClick={() => removeTask(todo.created_on)}
													>
														Delete
													</Button>
												</InputGroup.Append>
											</InputGroup>
										</td>
									</tr>
								</tbody>
							))
							//To Remove the Nothing To Do Statement
							.slice(1)}
					</Table>
				</div>
			)}
		</div>
	);
}

export default ToDo;
