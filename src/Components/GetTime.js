import React, { useState, useEffect } from 'react';

function GetTime() {
	const [timeKey, setTK] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTK((timeKey) => new Date());
		}, 500);
		return () => clearInterval(interval);
	}, []);

	const Hours = timeKey.getHours();
	const Minutes = timeKey.getMinutes();
	const Seconds = timeKey.getSeconds();
	var time = '' + (Hours > 12 ? Hours - 12 : Hours);
	if (Hours === 0) time = '12';
	if (Hours === 0) time = '12';
	time += (Minutes < 10 ? ':0' : ':') + Minutes;
	time += (Seconds < 10 ? ':0' : ':') + Seconds;
	time += Hours >= 12 ? ' P.M.' : ' A.M.';

	return (
		<div>
			<p>Time: {time}</p>
		</div>
	);
}

export default GetTime;
