import { React, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import '../App.css';
import tomato from '../Media/tomato-small.png';
import { TaskStore } from '../TaskStore';

function DisplayCurrentTask() {
	const currentTask = JSON.parse(TaskStore.useState((s) => s.currentTask));

	const showCurrentTask = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));

	const todoList = JSON.parse(TaskStore.useState((s) => s.todoList));
	const completedList = JSON.parse(TaskStore.useState((s) => s.completedList));

	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);

	function deleteCurrentTask() {
		var resetTask = '';
		localStorage.setItem('currentTask', JSON.stringify(resetTask));
		//setCurrentTask('Pick a new task.');
		TaskStore.update((s) => {
			s.showCurrentTask = JSON.stringify('none');
		});
		TaskStore.update((s) => {
			s.currentTask = JSON.stringify(resetTask);
		});
		localStorage.setItem('showCurrentTask', JSON.stringify('none'));
	}

	function completeCurrentTask() {
		const newTaskCount = completedTaskCount + 1;
		TaskStore.update((s) => {
			s.completedTaskCount = newTaskCount;
		});
		var completedOn = new Date().toISOString();
		const updateCompletedTodos = completedList.push({
			todo: currentTask.todo,
			completedOn: completedOn,
			createdOn: currentTask.createdOn,
			status: 'completed',
			category: '',
			order: 0,
			dueBy: currentTask.dueBy,
		});
		console.log(updateCompletedTodos);
		console.log(completedList);
		localStorage.setItem('completedList', JSON.stringify(completedList));
		TaskStore.update((s) => {
			s.completedList = JSON.stringify(completedList);
		});
		deleteCurrentTask();
		localStorage.setItem('completedTaskCount', newTaskCount);
	}

	function deselectToDo() {
		console.log('sending back');
		console.log(currentTask);
		const updateTodoList = {
			todo: currentTask.todo,
			createdOn: currentTask.createdOn,
			status: 'scheduled',
			category: '',
			order: 0,
			dueBy: currentTask.dueBy,
		};
		const updatedTodos = todoList.push(updateTodoList);
		//Length of New Items List
		console.log(updatedTodos);
		console.log(todoList);
		localStorage.setItem('todoList', JSON.stringify(todoList));
		TaskStore.update((s) => {
			s.todoList = JSON.stringify(todoList);
		});
		deleteCurrentTask();
	}

	let displayCurrentTask;
	if (currentTask === null) {
		displayCurrentTask = '';
	} else {
		displayCurrentTask = currentTask.todo;
	}

	return (
		<div style={{ display: showCurrentTask }}>
			<Table striped size='sm' variant='dark'>
				<tbody>
					<tr>
						<td>
							<img src={tomato} alt='Tomato' />
						</td>
						<td className='left'>Current Task: {displayCurrentTask} </td>
						<td className='right'>
							<InputGroup>
								<InputGroup.Prepend>
									<Button variant='success' sz='sm' onClick={completeCurrentTask}>
										Complete
									</Button>
								</InputGroup.Prepend>
								<InputGroup.Append>
									<Button value={currentTask} variant='warning' onClick={deselectToDo}>
										Deselect
									</Button>
								</InputGroup.Append>
								<InputGroup.Append>
									<Button variant='danger' onClick={deleteCurrentTask}>
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
