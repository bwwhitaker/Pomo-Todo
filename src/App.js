import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Route exact path='/' component={Home} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
