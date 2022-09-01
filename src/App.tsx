import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import URLPreview from './Components/URLPreview/URLPreview';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/url' element={<URLPreview />} />
			</Routes>
		</div>
	);
}

export default App;
