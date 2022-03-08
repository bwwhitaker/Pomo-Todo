import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export default function ScheduleChangeButton({ status }) {
	return status === 'scheduled' ? (
		<Button
			variant='dark'
			onClick={
				() => console.log('clicked')
				/* setScheduledTaskAsCurrentTask(
						todo.createdOn,
						todo.todo,
						todo.createdOn,
						todo.category,
						todo.dueBy,
						todo.order,
						todo.notes
					) */
			}
		>
			<FontAwesomeIcon className='icon' alt='Select' aria-label='Select' icon={faLaptopCode} />
		</Button>
	) : (
		<Button
			variant='dark'
			onClick={
				() => console.log('clicked')
				/* setScheduledTaskAsCurrentTask(
						todo.createdOn,
						todo.todo,
						todo.createdOn,
						todo.category,
						todo.dueBy,
						todo.order,
						todo.notes
					) */
			}
		>
			<FontAwesomeIcon className='icon' alt='Select' aria-label='Select' icon={faCalendarMinus} />
		</Button>
	);
}
