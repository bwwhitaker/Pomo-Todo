import React, { useState, useEffect } from 'react';
import tomato from '../Media/tomato-small.png';
import '../App.css';

function GetCompletedTasks() {
	const [getCompleteddNumber, setCompletedNumber] = useState(
		localStorage.getItem('completedTaskCount')
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCompletedNumber(localStorage.getItem('completedTaskCount'));
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="right">
			<p>
				Completed: {getCompleteddNumber}{' '}
				<img className="center" src={tomato} alt="Tomato" />
			</p>
		</div>
	);
}

export default GetCompletedTasks;
