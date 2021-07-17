import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import tomato from '../Media/tomato-small.png';
import '../App.css';
import { TaskStore } from '../TaskStore';
import ToDoCard from './ToDoCard';

function ToDo() {
	const todoListReadyToRender = JSON.parse(TaskStore.useState((s) => s.todoListReady));
	const tasksToDo = JSON.parse(TaskStore.useState((s) => s.todoList));
	const showCurrent = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));

	useEffect(() => {
		if (localStorage.length > 0) {
			console.log(todoListReadyToRender);
			console.log(showCurrent);
			console.log('got it');
		} else {
			localStorage.setItem('todoListReady', JSON.stringify('yes'));
			TaskStore.update((s) => {
				s.todoListReady = JSON.stringify('yes');
			});
			var createdOn = new Date().toISOString();
			var initializeTodoList = {
				todo: 'Nothing to do!',
				createdOn: createdOn,
				status: 'scheduled',
				category: '',
				dueBy: '',
				order: 0,
			};
			localStorage.setItem('todoList', JSON.stringify([initializeTodoList]));
			TaskStore.update((s) => {
				s.todoList = JSON.stringify(initializeTodoList);
			});
			console.log(initializeTodoList);
			localStorage.setItem('completedTaskCount', 0);
			TaskStore.update((s) => {
				s.completedTaskCount = 0;
			});

			localStorage.setItem('showCurrentTask', JSON.stringify('none'));
			TaskStore.update((s) => {
				s.showCurrentTask = JSON.stringify('none');
			});
			var initializeCurrentTask = '';
			localStorage.setItem('currentTask', JSON.stringify(initializeCurrentTask));
			TaskStore.update((s) => {
				s.currentTask = JSON.stringify(initializeCurrentTask);
			});
			var initializeCompletedList = [
				{
					todo: 'Nothing completed!',
					createdOn: createdOn,
					status: 'completed',
					category: '',
					dueBy: '',
					order: 0,
				},
			];
			localStorage.setItem('completedList', JSON.stringify(initializeCompletedList));
			TaskStore.update((s) => {
				s.completedList = JSON.stringify(initializeCompletedList);
			});
			console.log(initializeCompletedList);
		}
	});

	function setAsCurrentTask() {
		if (inputEl.current.value === '') {
		} else {
			var createdOn = new Date().toISOString();
			const enteredTask = {
				todo: inputEl.current.value,
				createdOn: createdOn,
				category: '',
				status: 'current',
				dueBy: '',
				order: '',
			};
			TaskStore.update((s) => {
				s.currentTask = JSON.stringify(enteredTask);
			});
			localStorage.setItem('currentTask', JSON.stringify(enteredTask));
			TaskStore.update((s) => {
				s.showCurrentTask = JSON.stringify('block');
			});
			localStorage.setItem('showCurrentTask', JSON.stringify('block'));
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	function setScheduledTaskAsCurrentTask(taskName, taskCreatedOn, taskCategory, taskDueBy, taskOrder) {
		const activeTask = {
			todo: taskName,
			createdOn: taskCreatedOn,
			category: taskCategory,
			status: 'current',
			dueBy: taskDueBy,
			order: taskOrder,
		};
		console.log(activeTask);
		TaskStore.update((s) => {
			s.currentTask = JSON.stringify(activeTask);
		});
		localStorage.setItem('currentTask', JSON.stringify(activeTask));
		TaskStore.update((s) => {
			s.showCurrentTask = JSON.stringify('block');
		});
		localStorage.setItem('showCurrentTask', JSON.stringify('block'));
	}

	function scheduleForLater() {
		if (inputEl.current.value === '') {
		} else {
			console.log('schedule for later');
			console.log(tasksToDo);
			var createdOn = new Date().toISOString();
			console.log(createdOn);
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				todo: inputEl.current.value,
				createdOn: createdOn,
				status: 'scheduled',
				category: '',
				order: 0,
				dueBy: '',
			};
			const newItems = tasksToDo.push(newItem);
			//Length of New Items List
			console.log(newItems);
			localStorage.setItem('todoList', JSON.stringify(tasksToDo));
			TaskStore.update((s) => {
				s.todoList = JSON.stringify(tasksToDo);
			});
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	const inputEl = useRef(null);

	function removeTask(taskIdentifier) {
		var newTaskList = JSON.parse(localStorage.getItem('todoList'));
		var keyOfTask = newTaskList.findIndex(function (task) {
			return task.createdOn === taskIdentifier;
		});
		if (keyOfTask > -1) {
			newTaskList.splice(keyOfTask, 1);
		}
		TaskStore.update((s) => {
			s.todoList = JSON.stringify(newTaskList);
		});
		localStorage.setItem('todoList', JSON.stringify(newTaskList));
		inputEl.current.focus();
		inputEl.current.value = '';
	}

	function startScheduledForLaterTask(taskIdentifier, taskName, taskCreatedOn, taskCategory, taskDueBy, taskOrder) {
		console.log(taskIdentifier);
		console.log(taskName);
		setScheduledTaskAsCurrentTask(taskIdentifier, taskName, taskCreatedOn, taskCategory, taskDueBy, taskOrder);
		var newTaskList = JSON.parse(localStorage.getItem('todoList'));
		var keyOfTask = newTaskList.findIndex(function (task) {
			return task.createdOn === taskIdentifier;
		});
		if (keyOfTask > -1) {
			newTaskList.splice(keyOfTask, 1);
		}
		console.log(newTaskList);
		TaskStore.update((s) => {
			s.todoList = JSON.stringify(newTaskList);
		});
		localStorage.setItem('todoList', JSON.stringify(newTaskList));
		inputEl.current.focus();
		inputEl.current.value = '';
	}

	return (
		<div>
			<InputGroup>
				<FormControl
					ref={inputEl}
					placeholder='Task'
					aria-label='Task Input'
					aria-describedby='basic-addon2'
					autoFocus={true}
				/>
				<InputGroup.Append>
					<Button variant='outline-secondary' onClick={setAsCurrentTask}>
						Begin
					</Button>
					<Button variant='outline-secondary' onClick={scheduleForLater}>
						Schedule
					</Button>
				</InputGroup.Append>
			</InputGroup>
			<p></p>

			{todoListReadyToRender === 'yes' && (
				<div key='toDoList'>
					{tasksToDo.length === 1 && (
						<Table striped size='sm' variant='dark'>
							<tbody>
								<tr>
									<td>Looks like you've got nothing ToDo!</td>
								</tr>
							</tbody>
						</Table>
					)}
					{tasksToDo.length >= 2 && (
						<Table striped size='sm' variant='dark'>
							{tasksToDo
								.map((todo) => (
									<tbody>
										<tr>
											<td>
												<img src={tomato} alt='Tomato' />
											</td>
											<td className='left'>{todo.todo}</td>
											<td className='right'>
												<InputGroup className='right'>
													<InputGroup.Prepend>
														<Button
															variant='success'
															sz='sm'
															value={todo.created_on}
															onClick={() =>
																startScheduledForLaterTask(
																	todo.createdOn,
																	todo.todo,
																	todo.createdOn,
																	todo.category,
																	todo.dueBy,
																	todo.order
																)
															}
														>
															Select
														</Button>
													</InputGroup.Prepend>
													<InputGroup.Append>
														<Button variant='danger' onClick={() => removeTask(todo.createdOn)}>
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
					)}
				</div>
			)}
			<ToDoCard />
		</div>
	);
}

export default ToDo;
