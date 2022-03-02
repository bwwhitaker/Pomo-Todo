import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';
import { TaskStore } from '../TaskStore';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './TodoCard/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faCalendarMinus, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToDoCard from './TodoCard/ToDoCard';

function DisplayCurrentTask() {
	const [state, setState] = useState({
		openDeleteDialog: false,
		selectedTaskIdentifier: '',
	});
	const { openDeleteDialog } = state;

	const handleOpenDeleteDialog = (taskIdentifier) => {
		setState({ ...state, selectedTaskIdentifier: taskIdentifier });
		setState({ ...state, openDeleteDialog: true });
	};

	const handleConfirmCloseDeleteDialog = () => {
		setState({ ...state, openDeleteDialog: false });
		deleteCurrentTask();
	};
	const handleCancelCloseDeleteDialog = () => {
		setState({ ...state, openDeleteDialog: false });
	};

	function cleanDueDate(todo) {
		if (todo === null) {
			let cleanedDate = '';
			return cleanedDate;
		}
		if (todo.dueBy === '') {
			let cleanedDate = '';
			return cleanedDate;
		} else {
			let cleanedDate = '- ' + new Date(todo.dueBy).toLocaleString();
			return cleanedDate;
		}
	}

	function cleanCategory(todo) {
		if (todo === null) {
			let cleanedCategory = '';
			return cleanedCategory;
		}
		if (todo.category === '') {
			let cleanedCategory = '';
			return cleanedCategory;
		} else {
			let cleanedCategory = '(' + todo.category + ')';
			return cleanedCategory;
		}
	}

	function cleanCreatedDate(todo) {
		if (todo === null) {
			let cleanedDate = '';
			return cleanedDate;
		}
		if (todo.createdOn === '') {
			let cleanedDate = '';
			return cleanedDate;
		} else {
			let cleanedDate = 'Created: ' + new Date(todo.createdOn).toLocaleString();
			return cleanedDate;
		}
	}

	function logClicked() {
		console.log('clicked');
	}

	const currentTask = JSON.parse(TaskStore.useState((s) => s.currentTask));
	const showCurrentTask = JSON.parse(TaskStore.useState((s) => s.showCurrentTask));
	const todoList = JSON.parse(TaskStore.useState((s) => s.todoList));
	const completedList = JSON.parse(TaskStore.useState((s) => s.completedList));
	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);
	const deletedList = JSON.parse(TaskStore.useState((s) => s.deletedList));

	function deleteCurrentTask() {
		var deletedOn = new Date().toISOString();
		console.log('deleting todo');
		console.log(currentTask);
		const updateTodoList = {
			todo: currentTask.todo,
			createdOn: currentTask.createdOn,
			status: 'deleted',
			category: currentTask.category,
			order: currentTask.order,
			dueBy: currentTask.dueBy,
			notes: currentTask.notes,
			deletedOn: deletedOn,
		};
		const updatedTodos = deletedList.push(updateTodoList);
		//Length of New Items List
		console.log(updatedTodos);
		console.log(deletedList);
		localStorage.setItem('deletedList', JSON.stringify(deletedList));
		TaskStore.update((s) => {
			s.deletedList = JSON.stringify(deletedList);
		});
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
			category: currentTask.category,
			order: currentTask.order,
			dueBy: currentTask.dueBy,
			notes: currentTask.notes,
		});
		console.log(updateCompletedTodos);
		console.log(completedList);
		localStorage.setItem('completedList', JSON.stringify(completedList));
		TaskStore.update((s) => {
			s.completedList = JSON.stringify(completedList);
		});
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
		localStorage.setItem('completedTaskCount', newTaskCount);
	}

	function deselectToDo() {
		console.log('sending back');
		console.log(currentTask);
		const updateTodoList = {
			todo: currentTask.todo,
			createdOn: currentTask.createdOn,
			status: 'scheduled',
			category: currentTask.category,
			order: currentTask.order,
			dueBy: currentTask.dueBy,
			notes: currentTask.notes,
		};
		const updatedTodos = todoList.push(updateTodoList);
		//Length of New Items List
		console.log(updatedTodos);
		console.log(todoList);
		localStorage.setItem('todoList', JSON.stringify(todoList));
		TaskStore.update((s) => {
			s.todoList = JSON.stringify(todoList);
		});
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

	var todo = JSON.parse(TaskStore.useState((s) => s.currentTask));

	var localeCreatedDate = cleanCreatedDate(todo);

	var localeDueDate = cleanDueDate(todo);

	var displayCategory = cleanCategory(todo);

	return (
		<div>
			{showCurrentTask === 'block' && (
				<div style={{ display: showCurrentTask }}>
					{/* <div className='card bg-c-green '>
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
														icon={faCalendarMinus}
														onClick={deselectToDo}
													/>
												</Button>
												<Button variant='dark'>
													<FontAwesomeIcon
														className='icon'
														alt='Edit'
														aria-label='Edit'
														icon={faPencilAlt}
														onClick={logClicked}
													/>
												</Button>
												<Button variant='dark'>
													<FontAwesomeIcon
														className='icon'
														alt='Complete'
														aria-label='Complete'
														icon={faCheckSquare}
														onClick={completeCurrentTask}
													/>
												</Button>
												<Button variant='dark'>
													<FontAwesomeIcon
														className='icon'
														alt='Delete'
														aria-label='Delete'
														icon={faTrashAlt}
														onClick={handleOpenDeleteDialog}
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
					</div> */}
					<ToDoCard todo={todo} />
				</div>
			)}

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

export default DisplayCurrentTask;
