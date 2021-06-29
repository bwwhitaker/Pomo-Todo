import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../App.css';

function Timer() {
	const [timerValue, setTimerValue] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [showPause, setShowPause] = useState('none');

	var workTime = 25 * 60 * 1000;
	var breakTime = 5 * 60 * 1000;

	function timerStartWork() {
		console.log('started work');
		setTimerValue(workTime);
		setTimerRunning(true);
		setShowPause('');
	}
	function resetTimer() {
		console.log('reset timer');
		setTimerValue(0);
		setTimerRunning(false);
		setShowPause('none');
	}

	function timerStartBreak() {
		console.log('started break');
		setTimerValue(breakTime);
		setTimerRunning(true);
		setShowPause('');
	}
	function timerPause() {
		if (timerRunning === true) {
			console.log('paused timer');
			setTimerRunning(false);
		} else {
			console.log('restarted timer');
			setTimerRunning(true);
		}
	}

	var minutes = Math.floor(timerValue / 60000);
	var seconds = Math.floor(timerValue / 1000 - minutes * 60);
	var tenthsOfSeconds = Math.floor(
		(timerValue - minutes * 60000 - seconds * 1000) / 100
	);
	var formattedTime = '';
	formattedTime += minutes;
	formattedTime += (seconds < 10 ? ':0' : ':') + seconds;
	formattedTime += '.' + tenthsOfSeconds;

	var pauseButtonLabel = timerRunning === true ? 'Pause' : 'Resume';

	useEffect(() => {
		const interval = setInterval(() => {
			if (timerRunning === true) {
				if (timerValue > 0) {
					var newTimerValue = timerValue - 100;
					setTimerValue(newTimerValue);
				} else {
					console.log('done');
				}
			}
		}, 100);
		return () => clearInterval(interval);
	});

	return (
		<div>
			<InputGroup>
				<InputGroup.Prepend>
					<Button onClick={timerStartWork} variant="success" sz="sm">
						Work
					</Button>
				</InputGroup.Prepend>
				<InputGroup.Append>
					<Button onClick={timerStartBreak} variant="danger" sz="sm">
						Break
					</Button>
				</InputGroup.Append>

				<InputGroup.Append>
					<div style={{ display: showPause }}>
						<Button className="unrounded" onClick={timerPause} sz="sm">
							{pauseButtonLabel}
						</Button>
					</div>
				</InputGroup.Append>

				<FormControl placeholder={formattedTime} readOnly disabled />
				<InputGroup.Append>
					<Button onClick={resetTimer} variant="secondary" sz="sm">
						Reset Timer
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
}

export default Timer;
