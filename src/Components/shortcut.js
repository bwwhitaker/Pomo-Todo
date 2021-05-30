useEffect(() => {
	document.addEventListener('keydown', (e) => {
		e.preventDefault();
		if (e.metaKey && e.code === 'Enter') {
			timerStart();
		}
		if (e.shiftKey && e.code === 'Enter') {
			scheduleForLater();
		}
	});
	document.removeEventListener('keydown', []);
});
