import React, { useState, useEffect } from "react";

function GetDate() {
	const [timeKey, setTK] = useState(new Date());
	//const [currentHour, setCurrentHour] = useState(timeKey.getSeconds());

	//console.log(currentTime);
	useEffect(() => {
		const interval = setInterval(() => {
			setTK((timeKey) => new Date());
		}, 100);
		return () => clearInterval(interval);
	}, []);
	const Day = timeKey.getDate();
	const Month = timeKey.getMonth();
	const Year = timeKey.getFullYear();

	return (
		<div>
			<p>
				Date: {Day}-{Month}-{Year}
			</p>
		</div>
	);
}

export default GetDate;
