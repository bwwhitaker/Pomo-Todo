import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useHotkeys } from 'react-hotkeys-hook';

function ToDo() {
	var [thingsToDo, setThingsToDo] = useLocalStorage('todoList', []);

	useEffect(() => {
		if (localStorage.getItem('todoList') === null) {
			var createdOn = new Date().toISOString();
			var initializeList = {
				key: 0,
				todo: 'Nothing to do!',
				created: createdOn,
				status: 'scheduled',
			};
			localStorage.setItem('todoList', JSON.stringify(initializeList));
			var retrievedData = localStorage.getItem('todoList');
			var todos = JSON.parse(retrievedData);
			console.log(todos);
			setThingsToDo([(thingsToDo = todos)]);
			console.log(thingsToDo);
		}
	});

	function useLocalStorage(key, initialValue) {
		// State to store our value
		// Pass initial state function to useState so logic is only executed once
		const [storedValue, setStoredValue] = useState(() => {
			try {
				// Get from local storage by key
				const item = window.localStorage.getItem(key);
				// Parse stored json or if none return initialValue
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				// If error also return initialValue
				console.log(error);
				return initialValue;
			}
		});
		// Return a wrapped version of useState's setter function that ...
		// ... persists the new value to localStorage.
		const setValue = (value) => {
			try {
				// Allow value to be a function so we have same API as useState
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				// Save state
				setStoredValue(valueToStore);
				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				// A more advanced implementation would handle the error case
				console.log(error);
			}
		};
		return [storedValue, setValue];
	}

	function timerStart() {
		if (inputEl.current.value === '') {
		} else {
			const retrievedToDos = localStorage.getItem('todoList');
			var parsedRetrievedToDos = JSON.parse(retrievedToDos);
			console.log('timer start');
			console.log(parsedRetrievedToDos);
			var createdOn = new Date().toISOString();
			console.log(createdOn);
			var keyGen = parsedRetrievedToDos.length;
			console.log(keyGen);
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				key: keyGen,
				item: inputEl.current.value,
				created_on: createdOn,
				status: 'working',
			};
			setThingsToDo([...thingsToDo, newItem]);
			const freshretrievedToDos = localStorage.getItem('todoList');
			var freshparsedRetrievedToDos = JSON.parse(freshretrievedToDos);
			console.log(freshparsedRetrievedToDos);
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	function scheduleForLater() {
		if (inputEl.current.value === '') {
		} else {
			const retrievedToDos = localStorage.getItem('todoList');
			var parsedRetrievedToDos = JSON.parse(retrievedToDos);
			console.log('schedule for later');
			console.log(parsedRetrievedToDos);
			var createdOn = new Date().toISOString();
			console.log(createdOn);
			var keyGen = parsedRetrievedToDos.length;
			console.log(keyGen);
			//Update to source item from Entry Form as the item. Also clear the entry form.
			const newItem = {
				key: keyGen,
				item: inputEl.current.value,
				created_on: createdOn,
				status: 'scheduled',
			};
			setThingsToDo([...thingsToDo, newItem]);
			const freshretrievedToDos = localStorage.getItem('todoList');
			var freshparsedRetrievedToDos = JSON.parse(freshretrievedToDos);
			console.log(freshparsedRetrievedToDos);
			inputEl.current.focus();
			inputEl.current.value = '';
		}
	}

	//Need to fix HotKeys
	/* const renderStartTooltip = (props) => (
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
	}); */

	const inputEl = useRef(null);

	return (
		<div>
			<p>I'm a ToDo Component</p>
			<InputGroup>
				<FormControl
					ref={inputEl}
					placeholder="Task"
					aria-label="Task Input"
					aria-describedby="basic-addon2"
					autoFocus={true}
				/>
				<InputGroup.Append>
					{/* <OverlayTrigger
						placement="bottom"
						delay={{ show: 50, hide: 5 }}
						overlay={renderStartTooltip}
					> */}
					<Button variant="outline-secondary" onClick={timerStart}>
						Start
					</Button>
					{/* 	</OverlayTrigger> */}

					{/* <OverlayTrigger
						placement="bottom"
						delay={{ show: 50, hide: 5 }}
						overlay={renderScheduleTooltip}
					> */}
					<Button variant="outline-secondary" onClick={scheduleForLater}>
						Schedule
					</Button>
					{/* </OverlayTrigger> */}
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
}

export default ToDo;
