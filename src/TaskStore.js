import { Store } from 'pullstate';

export const TaskStore = new Store({
	completedTaskCount: JSON.parse(localStorage.getItem('completedTaskCount')),
	showCurrentTask: JSON.parse(localStorage.getItem('showCurrentTask')),
});
