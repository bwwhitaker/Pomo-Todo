import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../App.css';
import { TaskStore } from '../TaskStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCoffee,
	faHourglassStart,
	faPauseCircle,
	faPlayCircle,
	faBackspace,
} from '@fortawesome/free-solid-svg-icons';

function Timer() {
	const timerEndTime = TaskStore.useState((s) => s.timerEndTime);
	const timerValue = TaskStore.useState((s) => s.timerValue);
	const [timerRunning, setTimerRunning] = useState(false);
	const [showPause, setShowPause] = useState('none');

	var workTime = 25 * 60 * 1000;
	var breakTime = 5 * 60 * 1000;

	function timerStartWork() {
		console.log('started work');
		const updatingNewEndTimeValue = Date.now() + workTime;
		setTimerRunning(true);
		setShowPause('');
		TaskStore.update((s) => {
			s.timerValue = workTime;
		});
		TaskStore.update((s) => {
			s.timerEndTime = updatingNewEndTimeValue;
		});
	}
	function resetTimer() {
		console.log('reset timer');
		setTimerRunning(false);
		setShowPause('none');
		TaskStore.update((s) => {
			s.timerValue = 0;
		});
		TaskStore.update((s) => {
			s.timerEndTime = 0;
		});
	}

	function timerStartBreak() {
		console.log('started break');
		const updatingEndTimeValue = Date.now() + breakTime;
		setTimerRunning(true);
		setShowPause('');
		TaskStore.update((s) => {
			s.timerValue = breakTime;
		});
		TaskStore.update((s) => {
			s.timerEndTime = updatingEndTimeValue;
		});
	}
	function timerPause() {
		if (timerRunning === true) {
			console.log('paused timer');
			setTimerRunning(false);
		} else {
			console.log('restarted timer');
			const currentTimerValue = timerValue;
			const updatingNewEndTime = currentTimerValue + Date.now();
			TaskStore.update((s) => {
				s.timerEndTime = updatingNewEndTime;
			});
			setTimerRunning(true);
		}
	}

	var minutes = Math.floor(timerValue / 60000);
	var seconds = Math.floor(timerValue / 1000 - minutes * 60);
	var tenthsOfSeconds = Math.floor((timerValue - minutes * 60000 - seconds * 1000) / 100);
	var formattedTime = '';
	formattedTime += minutes;
	formattedTime += (seconds < 10 ? ':0' : ':') + seconds;
	formattedTime += '.' + tenthsOfSeconds;

	var pauseButtonLabel =
		timerRunning === true ? (
			<FontAwesomeIcon aria-label='pause' icon={faPauseCircle} />
		) : (
			<FontAwesomeIcon aria-label='resume' icon={faPlayCircle} />
		);

	useEffect(() => {
		const interval = setInterval(() => {
			if (timerRunning === true) {
				if (timerValue > 100) {
					var changingTimerValue = timerEndTime - Date.now();
					TaskStore.update((s) => {
						s.timerValue = changingTimerValue;
					});
				} else {
					console.log('done');
					TaskStore.update((s) => {
						s.timerValue = 0;
					});
					TaskStore.update((s) => {
						s.timerEndTime = 0;
					});
					setTimerRunning(false);
					setShowPause('none');
				}
			}
		}, 100);
		return () => clearInterval(interval);
	});

	return (
		<div>
			<InputGroup>
				<InputGroup.Prepend>
					<Button aria-label='work' onClick={timerStartWork} variant='success' sz='sm'>
						<FontAwesomeIcon icon={faHourglassStart} />
					</Button>
				</InputGroup.Prepend>
				<InputGroup.Append>
					<Button aria-label='break' onClick={timerStartBreak} variant='danger' sz='sm'>
						<FontAwesomeIcon icon={faCoffee} />
					</Button>
				</InputGroup.Append>

				<FormControl placeholder={formattedTime} readOnly disabled />
				<InputGroup.Append>
					<div style={{ display: showPause }}>
						<Button className='unrounded' onClick={timerPause} sz='sm'>
							{pauseButtonLabel}
						</Button>
					</div>
				</InputGroup.Append>
				<InputGroup.Append>
					<Button aria-label='reset' onClick={resetTimer} variant='secondary' sz='sm'>
						<FontAwesomeIcon icon={faBackspace} />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
}

export default Timer;
