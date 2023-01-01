import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, IRootUser } from '../../types';
import useAPI from '../useAPI/useAPI';
import ApiService from '../../utils/ApiService';
import {
	ReactFacebookFailureResponse,
	ReactFacebookLoginInfo,
} from 'react-facebook-login';
import {
	FacebookSignInFunction,
	GoogleLoginFunction,
	RefreshTokenAPIResp,
	Tokens,
	UseAuth,
	UseAuthFuncs,
	User,
} from './types';
import { setUser } from '../../Slices/Auth';

const useAuth: UseAuth = () => {
	const user = useSelector<IRootState, IRootUser>((state) => state.user);
	const api = useAPI();
	const dispatch = useDispatch();
	const login: UseAuthFuncs['login'] = async (data) => {
		try {
			const { data: LoginResp } = await api.post<{
				data: {
					user: User;
					tokens: Tokens;
				};
			}>('/api/auth/login', {
				data,
			});
			if (LoginResp.data) {
				dispatch(setUser(LoginResp.data));
			}
		} catch (err) {
			throw err;
		}
	};
	const register: UseAuthFuncs['register'] = async (data) => {
		try {
			const { data: RegisterResp } = await ApiService.post<{
				data: {
					info: User;
					tokens: Tokens;
				};
			}>('/api/auth/register', {
				data,
			});
			if (RegisterResp) {
				dispatch(setUser(RegisterResp.data));
			}
		} catch (err) {
			throw err;
		}
	};
	const logout: UseAuthFuncs['logout'] = () => {};
	const getTokens: UseAuthFuncs['getTokens'] = () => {
		if (!user?.access_token || !user?.refresh_token) return null;
		return {
			access_token: user.access_token,
			refresh_token: user.refresh_token,
		};
	};
	const getUser: UseAuthFuncs['getUser'] = () => {
		return user.info;
	};
	const isAuthenticated: UseAuthFuncs['isAuthenticated'] = () => {
		return user.access_token !== null;
	};
	const refreshToken: UseAuthFuncs['refreshToken'] = async (options) => {
		try {
			const { data: RefreshTokenResp } = await api.post<RefreshTokenAPIResp>(
				'/api/refresh',
				{
					data: {
						refresh_token: user.refresh_token,
					},
				},
			);
			if (RefreshTokenResp.data) {
				dispatch(setUser(RefreshTokenResp.data));
			}
		} catch (err) {
			if (options && options.onError) {
				options.onError(err);
			}
		}
	};
	const refreshUser: UseAuthFuncs['refreshUser'] = async () => {
		await api.get('/api/user');
	};
	const googleLogin: GoogleLoginFunction = async (tokenResponse, options) => {
		try {
			const { data: GoogleLoginResp } = await api.post<{
				data: {
					info: User;
					tokens: Tokens;
				};
			}>('/api/auth/google', {
				data: {
					accessToken: tokenResponse.access_token,
				},
			});
			if (GoogleLoginResp) {
				dispatch(setUser(GoogleLoginResp.data));
			}
		} catch (err) {
			if (options && options.onError) {
				options.onError(err);
			}
			throw err;
		}
	};
	const resendToken = async () => {
		try {
			if (!user.info) return;

			await api.post('/api/auth/resend-email', {
				data: {
					id: user.info.id,
				},
			});
		} catch (err) {
			throw err;
		}
	};
	const facebookSignIn: FacebookSignInFunction = async (
		tokenResponse,
		options,
	) => {
		try {
			if (!tokenResponse) throw new Error('No access token');
			if ((tokenResponse as ReactFacebookFailureResponse).status)
				throw new Error((tokenResponse as ReactFacebookFailureResponse).status);
			const oAuthResponse = tokenResponse as ReactFacebookLoginInfo;
			const { data: FacebookSignInResp } = await api.post<{
				data: {
					info: User;
					tokens: Tokens;
				};
			}>('/api/auth/facebook', {
				data: {
					accessToken: oAuthResponse.accessToken,
				},
			});
			if (FacebookSignInResp) {
				dispatch(setUser(FacebookSignInResp.data));
			}
		} catch (err) {
			if (options && options.onError) {
				options.onError(err);
			}
			throw err;
		}
	};
	const verifyEmail = async (token: string) => {
		try {
			await api.post('/api/auth/verify', {
				data: {
					token,
				},
			});
		} catch (err) {
			throw err;
		}
	};
	return {
		login,
		register,
		logout,
		getTokens,
		getUser,
		isAuthenticated,
		refreshToken,
		refreshUser,
		facebookLogin: facebookSignIn,
		googleLogin,
		resendToken,
		verifyToken: verifyEmail,
	};
};
export default useAuth;
