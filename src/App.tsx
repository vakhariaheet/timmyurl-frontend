import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { FacebookProvider } from 'react-facebook';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Register from './Pages/Register/Register';
import TermsOfService from './Pages/TermsOfService/TermsOfService';
import URLPreview from './Pages/URLPreview/URLPreview';

function App() {
	return (
		<div className='App'>
			<GoogleOAuthProvider
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
			>
				<Routes>
					<Route path='/privacy-policy' element={<PrivacyPolicy />} />
					<Route path='/terms-and-conditions' element={<TermsOfService />} />
					<Route path='/url' element={<URLPreview />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<div>404 Page</div>} />
				</Routes>
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
