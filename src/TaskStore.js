import { Store } from 'pullstate';

export const TaskStore = new Store({
	completedTaskCount: JSON.parse(localStorage.getItem('completedTaskCount')),
	showCurrentTask: localStorage.getItem('showCurrentTask'),
	currentTask: localStorage.getItem('currentTask'),
	todoList: localStorage.getItem('todoList'),
	todoListReady: localStorage.getItem('todoListReady'),
	completedList: localStorage.getItem('completedList'),
	timerEndTime: 0,
	timerValue: 0,
	taskToBeDeletedIdentifier: '',
	taskToBeEditedIdentifier: '',
	taskDetailsForEditing: {},
	deletedList: localStorage.getItem('deletedList'),
});
