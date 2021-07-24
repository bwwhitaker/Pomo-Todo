import React from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, InputGroup } from 'react-bootstrap';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faLaptopCode, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TaskStore } from '../TaskStore';

function logClicked() {
	console.log('clicked');
}

function cleanDueDate(date) {
	if (date === undefined) {
		let cleanedDate = '';
		return cleanedDate;
	}
	if (date === '') {
		let cleanedDate = '';
		return cleanedDate;
	} else {
		let cleanedDate = '- ' + new Date(date).toLocaleString();
		return cleanedDate;
	}
}

function cleanCategory(category) {
	if (category === '') {
		let cleanedCategory = '';
		return cleanedCategory;
	}
	if (category === undefined) {
		let cleanedCategory = '';
		return cleanedCategory;
	} else {
		let cleanedCategory = '(' + category + ')';
		return cleanedCategory;
	}
}

function cleanCreatedDate(date) {
	if (date === undefined) {
		let cleanedDate = '';
		return cleanedDate;
	}
	if (date === '') {
		let cleanedDate = '';
		return cleanedDate;
	} else {
		let cleanedDate = 'Created: ' + new Date(date).toLocaleString();
		return cleanedDate;
	}
}

function CurrentCard({ todo }) {
	var todo = JSON.parse(TaskStore.useState((s) => s.currentTask));

	var localeCreatedDate = cleanCreatedDate(todo.createdOn);

	var localeDueDate = cleanDueDate(todo.dueBy);

	var displayCategory = cleanCategory(todo.category);
	return <div></div>;
}

export default CurrentCard;
