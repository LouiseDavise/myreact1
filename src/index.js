import React from 'react';
import ReactDOM from 'react-dom';
import Root from './component/Root'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { initFirebase } from './api'
import AuthContextProvider from './component/Context';

// Initialize Firebase
initFirebase();

// To Access AuthContext, the component must be the child of the AuthContextProvider
ReactDOM.render(
	<React.StrictMode>
		<Router>
            <AuthContextProvider>
			    <Root />
            </AuthContextProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
