import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';

import Amplify from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
	return (
		<div>
			<AmplifyAuthenticator>
				<Router>
					<Header />
					<Route exact path='/' component={Home} />
					<Footer />
				</Router>
			</AmplifyAuthenticator>
		</div>
	);
}

export default App;
