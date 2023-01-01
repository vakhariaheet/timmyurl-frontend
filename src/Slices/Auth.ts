import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	info: null,
	access_token: null,
	refresh_token: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { info, tokens } = action.payload;
			if (info) state.info = info;
			if (tokens && tokens.access_token)
				state.access_token = tokens.accessToken;
			if (tokens && tokens.refresh_token)
				state.refresh_token = tokens.refreshToken;
		},
		logOut: () => {
			return initialState;
		},
	},
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
