import React, { useState, useEffect } from 'react';

function GetDate() {
	const [timeKey, setTimeKey] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeKey((timeKey) => new Date());
		}, 100);
		return () => clearInterval(interval);
	}, []);
	const Day = timeKey.getDate();
	const Month = timeKey.getMonth() + 1;
	const Year = timeKey.getFullYear();

	return (
		<div>
			<p>
				Date: {Month}-{Day}-{Year}
			</p>
		</div>
	);
}

export default GetDate;
