import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Home from './Components/Home';

function App() {
	return (
		<Router>
			<Header />
			<Route exact path='/' component={Home} />
		</Router>
	);
}

export default App;
