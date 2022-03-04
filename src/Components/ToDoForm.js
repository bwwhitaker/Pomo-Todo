import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import '../App.css';
import { TaskStore } from '../TaskStore';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid';

function ToDoForm() {
	const todoListReadyToRender = JSON.parse(TaskStore.useState((s) => s.todoListReady));
	const tasksToDo = JSON.parse(TaskStore.useState((s) => s.todoList));
	const showCurrent = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));
	const inputTodo = useRef(null);
	const currentTask = JSON.parse(TaskStore.useState((s) => s.currentTask));

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
			localStorage.setItem('todoList', JSON.stringify([]));
			TaskStore.update((s) => {
				s.todoList = JSON.stringify([]);
			});
			localStorage.setItem('completedTaskCount', 0);
			TaskStore.update((s) => {
				s.completedTaskCount = 0;
			});
			localStorage.setItem('showCurrentTask', JSON.stringify('none'));
			TaskStore.update((s) => {
				s.showCurrentTask = JSON.stringify('none');
			});
			localStorage.setItem('currentTask', JSON.stringify(''));
			TaskStore.update((s) => {
				s.currentTask = JSON.stringify('');
			});
			localStorage.setItem('completedList', JSON.stringify([]));
			TaskStore.update((s) => {
				s.completedList = JSON.stringify([]);
			});
		}
	});

	const [state, setState] = useState({
		openOverwriteCurrentTaskWarning: false,
		openBlankFormWarning: false,
	});

	function Alert(props) {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	}
	const { openOverwriteCurrentTaskWarning, openBlankFormWarning } = state;

	const handleCloseCurrentTaskWarning = () => {
		setState({ ...state, openOverwriteCurrentTaskWarning: false });
	};

	const handleCloseBlankFormWarning = () => {
		setState({ ...state, openBlankFormWarning: false });
	};

	function setAsCurrentTask() {
		if (inputTodo.current.value === '') {
			setState({ openBlankFormWarning: true, ...setState });
		} else {
			if (currentTask !== '') {
				setState({ openOverwriteCurrentTaskWarning: true, ...setState });
			} else {
				var createdOn = new Date().toISOString();
				const enteredTask = {
					todo: inputTodo.current.value,
					createdOn: createdOn,
					category: '',
					status: 'current',
					notes: '',
					dueBy: '',
					order: '',
					id: uuidv4(),
				};
				TaskStore.update((s) => {
					s.currentTask = JSON.stringify(enteredTask);
				});
				localStorage.setItem('currentTask', JSON.stringify(enteredTask));
				TaskStore.update((s) => {
					s.showCurrentTask = JSON.stringify('block');
				});
				localStorage.setItem('showCurrentTask', JSON.stringify('block'));
				inputTodo.current.focus();
				inputTodo.current.value = '';
			}
		}
	}

	function scheduleForLater() {
		if (inputTodo.current.value === '') {
			setState({ openBlankFormWarning: true, ...setState });
		} else {
			console.log('schedule for later');
			const createdOn = new Date().toISOString();
			console.log(createdOn);
			const newTodo = inputTodo.current.value;
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				todo: newTodo,
				createdOn: createdOn,
				status: 'scheduled',
				category: '',
				order: 0,
				dueBy: '',
				notes: '',
				id: uuidv4(),
			};
			const newItems = tasksToDo.push(newItem);
			//Length of New Items List
			console.log(newItems);
			localStorage.setItem('todoList', JSON.stringify(tasksToDo));
			TaskStore.update((s) => {
				s.todoList = JSON.stringify(tasksToDo);
			});
			inputTodo.current.focus();
			inputTodo.current.value = '';
		}
	}

	return (
		<div className='inputs'>
			<InputGroup>
				<FormControl
					ref={inputTodo}
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

			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={openOverwriteCurrentTaskWarning}
				onClose={handleCloseCurrentTaskWarning}
				autoHideDuration={5000}
			>
				<Alert onClose={handleCloseCurrentTaskWarning} severity='error'>
					Please return current task to the scheduled list first!
				</Alert>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={openBlankFormWarning}
				onClose={handleCloseBlankFormWarning}
				autoHideDuration={5000}
			>
				<Alert onClose={handleCloseBlankFormWarning} severity='warning'>
					Please enter a task first!
				</Alert>
			</Snackbar>
		</div>
	);
}

export default ToDoForm;
