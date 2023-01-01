import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Register from './Pages/Register/Register';
import TermsOfService from './Pages/TermsOfService/TermsOfService';
import URLPreview from './Pages/URLPreview/URLPreview';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';

function App() {
	return (
		<div className='App'>
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
			>
				<Routes>
					<Route path='/privacy-policy' element={<PrivacyPolicy />} />
					<Route path='/terms-and-conditions' element={<TermsOfService />} />
					<Route path='/url' element={<URLPreview />} />
					<Route path='/register' element={<Register />} />
					<Route path='/confirm-email' element={<ConfirmEmail />} />
					<Route path='/verify-email' element={<VerifyEmail />} />
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<HomePage />} />
					<Route path='*' element={<div>404 Page</div>} />
				</Routes>
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
