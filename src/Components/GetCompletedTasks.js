import React, { useState, useEffect } from 'react';
import tomato from '../Media/tomato-small.png';
import '../App.css';
import { TaskStore } from '../TaskStore';

function GetCompletedTasks() {
	const completedTaskCount = TaskStore.useState((s) => s.completedTaskCount);

	return (
		<div className="right">
			<p>
				Completed: {completedTaskCount}{' '}
				<img className="center" src={tomato} alt="Tomato" />
			</p>
		</div>
	);
}

export default GetCompletedTasks;
