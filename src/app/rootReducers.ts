import { combineReducers } from 'redux';
import Auth from '../Slices/Auth';
const rootReducer = combineReducers({
	user: Auth,
});

export default rootReducer;
