export function toggleStatusBetweenScheduledAndCurrent(todo) {
	if (todo.status === 'scheduled') {
		console.log('attempt changing to current status');
	}
	if (todo.status === 'current') {
		console.log('return to scheduled status');
	}
}

/* function deselectToDo() {
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
	deleteCurrentTask();
} */
