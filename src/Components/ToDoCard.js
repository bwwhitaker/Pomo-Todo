import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faLaptopCode, faPencilAlt, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { TaskStore } from '../TaskStore';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ToDoCard({ todo }) {
	function cleanDueDate(date) {
		if (date === undefined) {
			let cleanedDate = '';
			return cleanedDate;
		}
		if (date === '') {
			let cleanedDate = '';
			return cleanedDate;
		} else {
			let cleanedDate = '- ' + new Date(date).toLocaleString();
			return cleanedDate;
		}
	}

	const selectedTaskToBeDeleted = TaskStore.useState((s) => s.taskToBeDeletedIdentifier);

	const [state, setState] = useState({
		openOverwriteCurrentTaskWarning: false,
		openDeleteDialog: false,
	});

	const { openOverwriteCurrentTaskWarning, openDeleteDialog } = state;

	function Alert(props) {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	}

	const handleCloseCurrentTaskWarning = () => {
		setState({ ...state, openOverwriteCurrentTaskWarning: false });
	};

	const handleOpenDeleteDialog = (taskIdentifier) => {
		TaskStore.update((s) => {
			s.taskToBeDeletedIdentifier = taskIdentifier;
		});
		console.log(taskIdentifier);
		setState({ ...state, openDeleteDialog: true });
	};

	const handleConfirmCloseDeleteDialog = () => {
		const taskIdentifier = selectedTaskToBeDeleted;
		console.log(taskIdentifier);
		removeTask(selectedTaskToBeDeleted);
	};
	const handleCancelCloseDeleteDialog = () => {
		setState({ ...state, openDeleteDialog: false });
		TaskStore.update((s) => {
			s.currentSelectedToDeleteTask = '';
		});
	};

	function cleanCategory(category) {
		if (category === '') {
			let cleanedCategory = '';
			return cleanedCategory;
		}
		if (category === undefined) {
			let cleanedCategory = '';
			return cleanedCategory;
		} else {
			let cleanedCategory = '(' + category + ')';
			return cleanedCategory;
		}
	}

	function cleanCreatedDate(date) {
		if (date === undefined) {
			let cleanedDate = '';
			return cleanedDate;
		}
		if (date === '') {
			let cleanedDate = '';
			return cleanedDate;
		} else {
			let cleanedDate = 'Created: ' + new Date(date).toLocaleString();
			return cleanedDate;
		}
	}

	function removeTask() {
		const selectedTaskToBeDeletedIs = selectedTaskToBeDeleted;
		console.log(selectedTaskToBeDeletedIs);
		var newTaskList = JSON.parse(localStorage.getItem('todoList'));
		var keyOfTask = newTaskList.findIndex(function (task) {
			return task.createdOn === selectedTaskToBeDeletedIs;
		});
		if (keyOfTask > -1) {
			newTaskList.splice(keyOfTask, 1);
		}
		TaskStore.update((s) => {
			s.todoList = JSON.stringify(newTaskList);
		});
		localStorage.setItem('todoList', JSON.stringify(newTaskList));
		setState({ ...state, openDeleteDialog: false });
	}

	function setScheduledTaskAsCurrentTask(taskIdentifier, taskName, taskCreatedOn, taskCategory, taskDueBy, taskOrder) {
		const isThereCurrentTask = JSON.parse(localStorage.getItem('currentTask'));
		if (isThereCurrentTask !== '') {
			setState({ openOverwriteCurrentTaskWarning: true, ...setState });
		} else {
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
			const activeTask = {
				todo: taskName,
				createdOn: taskCreatedOn,
				category: taskCategory,
				status: 'current',
				dueBy: taskDueBy,
				order: taskOrder,
				notes: '',
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
	}

	const completedList = JSON.parse(TaskStore.useState((s) => s.completedList));

	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);

	function completeScheduledTaask(taskIdentifier, taskName, taskCreatedOn, taskCategory, taskDueBy, taskOrder) {
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
		const newTaskCount = completedTaskCount + 1;
		TaskStore.update((s) => {
			s.completedTaskCount = newTaskCount;
		});
		var completedOn = new Date().toISOString();
		const updateCompletedTodos = completedList.push({
			todo: taskName,
			completedOn: completedOn,
			createdOn: taskCreatedOn,
			status: 'completed',
			category: taskCategory,
			order: taskOrder,
			dueBy: taskDueBy,
			notes: '',
		});
		console.log(updateCompletedTodos);
		console.log(completedList);
		localStorage.setItem('completedList', JSON.stringify(completedList));
		TaskStore.update((s) => {
			s.completedList = JSON.stringify(completedList);
		});
		removeTask();
		localStorage.setItem('completedTaskCount', newTaskCount);
	}

	var localeCreatedDate = cleanCreatedDate(todo.createdOn);

	var localeDueDate = cleanDueDate(todo.dueBy);

	var displayCategory = cleanCategory(todo.category);

	return (
		<div>
			<div class='card bg-c-yellow '>
				<div>
					<Card.Body>
						<Row>
							<Col>
								<span className='f-left card-title'>
									{todo.todo} {localeDueDate} {displayCategory}
								</span>
							</Col>
							<Col>
								<span className='f-right'>
									<ButtonGroup>
										<Button variant='dark'>
											<FontAwesomeIcon
												className='icon'
												alt='Select'
												aria-label='Select'
												icon={faLaptopCode}
												onClick={() =>
													setScheduledTaskAsCurrentTask(
														todo.createdOn,
														todo.todo,
														todo.createdOn,
														todo.category,
														todo.dueBy,
														todo.order
													)
												}
											/>
										</Button>
										<Button variant='dark'>
											<FontAwesomeIcon className='icon' alt='Edit' aria-label='Edit' icon={faPencilAlt} />
										</Button>
										<Button variant='dark'>
											<FontAwesomeIcon
												className='icon'
												alt='Complete'
												aria-label='Complete'
												icon={faCheckSquare}
												onClick={() =>
													completeScheduledTaask(
														todo.createdOn,
														todo.todo,
														todo.createdOn,
														todo.category,
														todo.dueBy,
														todo.order
													)
												}
											/>
										</Button>
										<Button variant='dark'>
											<FontAwesomeIcon
												className='icon'
												alt='Delete'
												aria-label='Delete'
												onClick={() => handleOpenDeleteDialog(todo.createdOn)}
												icon={faTrashAlt}
												//onClick={() => removeTask(todo.createdOn)}
											/>
										</Button>
									</ButtonGroup>
								</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-left notes'>{todo.notes}</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<span className='f-right created-info'>{localeCreatedDate}</span>
							</Col>
						</Row>
					</Card.Body>
				</div>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={openOverwriteCurrentTaskWarning}
				onClose={handleCloseCurrentTaskWarning}
				autoHideDuration={5000}
			>
				<Alert onClose={handleCloseCurrentTaskWarning} severity='error'>
					Please deselect current task first.
				</Alert>
			</Snackbar>
			<Dialog
				open={openDeleteDialog}
				onClose={handleCancelCloseDeleteDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Confirm Delete!'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm Delete as this cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelCloseDeleteDialog} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleConfirmCloseDeleteDialog} color='primary' autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ToDoCard;
