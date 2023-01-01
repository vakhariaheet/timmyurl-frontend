import { TokenResponse } from '@react-oauth/google';
import {
	ReactFacebookFailureResponse,
	ReactFacebookLoginInfo,
} from 'react-facebook-login';

export interface useAuthLoginProps {
	email: string;
	password: string;
}
export interface useAuthRegisterProps {
	email: string;
	password: string;
	name: string;
}
export type UseAuth = () => UseAuthFuncs;
export interface UseAuthFuncs {
	login: (data: useAuthLoginProps) => Promise<void>;
	register: (data: useAuthRegisterProps) => Promise<void>;

	googleLogin: GoogleLoginFunction;
	facebookLogin: FacebookSignInFunction;
	verifyToken: (token: string) => Promise<any>;
	resendToken: () => Promise<void>;
	logout: () => void;
	getUser: () => User | null;
	getTokens: () => Tokens | null;
	isAuthenticated: () => boolean;
	refreshToken: (options?: {
		onError: (err: unknown) => void;
	}) => Promise<void>;
	refreshUser: () => Promise<void>;
}
export type GoogleLoginFunction = (
	tokenResponse: Omit<
		TokenResponse,
		'error' | 'error_description' | 'error_uri'
	>,
	options?: {
		onSuccess: () => User;
		onError: (error: unknown) => void;
	},
) => Promise<void>;

export type FacebookSignInFunction = (
	tokenResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
	options?: {
		onSuccess: (user: User) => void;
		onError: (error: unknown) => void;
	},
) => Promise<void>;
export interface User {
	email: string;
	name: string;
	id: string;
}
export interface Tokens {
	access_token: string;
	refresh_token: string;
}
export interface RefreshTokenAPIResp {
	message: string;
	data?: {
		tokens: Tokens;
	};
}
