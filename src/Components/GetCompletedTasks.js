import React from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';
import { TaskStore } from '../TaskStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function GetCompletedTasks() {
	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);

	return (
		<div>
			<p>
				<Button variant='secondary' disabled>
					Completed: {completedTaskCount} <FontAwesomeIcon icon={faClipboardCheck} />
				</Button>
			</p>
		</div>
	);
}

export default GetCompletedTasks;
