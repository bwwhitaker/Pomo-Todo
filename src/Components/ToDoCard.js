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
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

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
		openEditDialog: false,
	});

	const { openOverwriteCurrentTaskWarning, openDeleteDialog, openEditDialog } = state;

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

	const handleOpenEditDialog = (
		taskIdentifier,
		taskName,
		taskCreatedOn,
		taskCategory,
		taskDueBy,
		taskOrder,
		taskNotes
	) => {
		setState({ ...state, openEditDialog: true });
		TaskStore.update((s) => {
			s.currentSelectedToDeleteTask = '';
		});
		TaskStore.update((s) => {
			s.taskToBeEditedIdentifier = taskIdentifier;
		});
		const taskToBeEdited = {
			todo: taskName,
			createdOn: taskCreatedOn,
			category: taskCategory,
			status: 'scheduled',
			dueBy: taskDueBy,
			order: taskOrder,
			notes: taskNotes,
		};
		console.log(taskToBeEdited);
		TaskStore.update((s) => {
			s.taskDetailsForEditing = taskToBeEdited;
		});
	};

	const dateValue = new Date();
	const Hours = dateValue.getHours();
	const Minutes = dateValue.getMinutes();
	const Year = dateValue.getFullYear();
	const Month = dateValue.getMonth() + 1;
	const Day = dateValue.getDay();
	var defaultDateValue = '';
	defaultDateValue += Year;
	defaultDateValue += (Month < 10 ? '-0' : '-') + Month;
	defaultDateValue += (Day < 10 ? '-0' : '-') + Day;
	defaultDateValue += (Hours < 10 ? 'T0' : 'T') + Hours;
	defaultDateValue += (Minutes < 10 ? ':0' : ':') + Minutes;

	const idToBeModified = TaskStore.useState((s) => s.taskToBeEditedIdentifier);

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
	const handleCancelCloseEditDialog = () => {
		setState({ ...state, openEditDialog: false });
	};
	const handleUpdateCloseEditDialog = () => {
		setState({ ...state, openEditDialog: false });
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

	function setScheduledTaskAsCurrentTask(
		taskIdentifier,
		taskName,
		taskCreatedOn,
		taskCategory,
		taskDueBy,
		taskOrder,
		taskNotes
	) {
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
				notes: taskNotes,
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

	function completeScheduledTask(
		taskIdentifier,
		taskName,
		taskCreatedOn,
		taskCategory,
		taskDueBy,
		taskOrder,
		taskNotes
	) {
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
			notes: taskNotes,
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

	var taskToBeEdited = TaskStore.useState((s) => s.taskDetailsForEditing);

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
										<Button
											variant='dark'
											onClick={() =>
												setScheduledTaskAsCurrentTask(
													todo.createdOn,
													todo.todo,
													todo.createdOn,
													todo.category,
													todo.dueBy,
													todo.order,
													todo.notes
												)
											}
										>
											<FontAwesomeIcon className='icon' alt='Select' aria-label='Select' icon={faLaptopCode} />
										</Button>
										<Button
											variant='dark'
											onClick={() =>
												handleOpenEditDialog(
													todo.createdOn,
													todo.todo,
													todo.createdOn,
													todo.category,
													todo.dueBy,
													todo.order,
													todo.notes
												)
											}
										>
											<FontAwesomeIcon className='icon' alt='Edit' aria-label='Edit' icon={faPencilAlt} />
										</Button>
										<Button
											variant='dark'
											onClick={() =>
												completeScheduledTask(
													todo.createdOn,
													todo.todo,
													todo.createdOn,
													todo.category,
													todo.dueBy,
													todo.order,
													todo.notes
												)
											}
										>
											<FontAwesomeIcon className='icon' alt='Complete' aria-label='Complete' icon={faCheckSquare} />
										</Button>
										<Button variant='dark' onClick={() => handleOpenDeleteDialog(todo.createdOn)}>
											<FontAwesomeIcon className='icon' alt='Delete' aria-label='Delete' icon={faTrashAlt} />
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
					Please return current task to the scheduled list first!
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
			<Dialog
				open={openEditDialog}
				onClose={handleCancelCloseEditDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				disableBackdropClick={true}
			>
				<DialogTitle id='alert-dialog-title'>Edit Task</DialogTitle>
				<DialogContent dividers>
					<TextField id='standard-text-area' label='Todo' defaultValue={taskToBeEdited.todo} fullWidth multiline />
					<Divider />
					<TextField
						id='datetime-local'
						type='datetime-local'
						label='Due By'
						defaultValue={defaultDateValue}
						InputLabelProps={{
							shrink: true,
						}}
						fullWidth
					/>
					<Divider />
					<TextField
						id='standard-textarea'
						label='Notes'
						defaultValue={taskToBeEdited.notes}
						multiline
						autoFocus
						fullWidth
					/>
					<Divider />
					<TextField id='standard-basic' label='Category' defaultValue={taskToBeEdited.category} fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelCloseEditDialog} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleUpdateCloseEditDialog} color='primary'>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ToDoCard;
