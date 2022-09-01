import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { FacebookProvider } from 'react-facebook';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register/Register';
import URLPreview from './Pages/URLPreview/URLPreview';

function App() {
	return (
		<div className='App'>
			<GoogleOAuthProvider
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
			>
				<Routes>
					<Route path='/url' element={<URLPreview />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<div>404 Page</div>} />
				</Routes>
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
