import React, { useEffect, useState } from 'react';
import '../App.css';
import { TaskStore } from '../TaskStore';
import ToDoCard from './TodoCard/ToDoCard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function DisplayToDoList() {
	const todoListReadyToRender = JSON.parse(TaskStore.useState((s) => s.todoListReady));
	const tasksToDo = JSON.parse(TaskStore.useState((s) => s.todoList));
	const showCurrent = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));

	useEffect(() => {
		if (localStorage.length > 0) {
			console.log(todoListReadyToRender);
			console.log(showCurrent);
			console.log('got it');

			if (localStorage.getItem('deletedList') === null) {
				localStorage.setItem('deletedList', JSON.stringify([]));
				TaskStore.update((s) => {
					s.deletedList = JSON.stringify([]);
				});
			}
			if (localStorage.getItem('currentTask') === JSON.stringify('Pick a new task.')) {
				localStorage.setItem('currentTask', JSON.stringify(''));
				TaskStore.update((s) => {
					s.currentTask = JSON.stringify('');
				});
			}
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

	return (
		<div>
			<div className='box'>
				{todoListReadyToRender === 'yes' && (
					<div key='toDoList'>{tasksToDo.length >= 1 && tasksToDo.map((todo) => <ToDoCard todo={todo} />)}</div>
				)}
			</div>
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

export default DisplayToDoList;
