import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useHotkeys } from 'react-hotkeys-hook';

function ToDo() {
	function timerStart() {
		console.log('timer start');
	}

	function scheduleForLater() {
		console.log('schedule for later');
	}

	const renderStartTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Command+Enter
		</Tooltip>
	);

	const renderScheduleTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Shift+Enter
		</Tooltip>
	);

	useHotkeys('Shift+Enter', () => scheduleForLater(), {
		enableOnTags: 'INPUT',
	});
	useHotkeys('Command+Enter', () => timerStart(), {
		enableOnTags: 'INPUT',
	});

	return (
		<div>
			<p>I'm a ToDo Component</p>
			<InputGroup>
				<FormControl
					placeholder="Task"
					aria-label="Task Input"
					aria-describedby="basic-addon2"
				/>
				<InputGroup.Append>
					<OverlayTrigger
						placement="bottom"
						delay={{ show: 50, hide: 5 }}
						overlay={renderStartTooltip}
					>
						<Button variant="outline-secondary" onClick={timerStart}>
							Start
						</Button>
					</OverlayTrigger>

					<OverlayTrigger
						placement="bottom"
						delay={{ show: 50, hide: 5 }}
						overlay={renderScheduleTooltip}
					>
						<Button variant="outline-secondary" onClick={scheduleForLater}>
							Schedule
						</Button>
					</OverlayTrigger>
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
}

export default ToDo;
