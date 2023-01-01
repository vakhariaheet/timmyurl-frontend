import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Slices/Auth';
import { IRootState, IRootUser } from '../../types';
import { RefreshTokenAPIResp, Tokens } from '../useAuth/types';

const useAPI = () => {
	const user = useSelector<IRootState, IRootUser>((state) => state.user);
	const dispatch = useDispatch();
	const tokens = useSelector<IRootState, Tokens | null>((state) => {
		if (state.user.access_token && state.user.refresh_token) {
			return {
				access_token: state.user.access_token,
				refresh_token: state.user.refresh_token,
			};
		}
		return null;
	});
	const addAuthHeader = (config?: AxiosRequestConfig) => {
		if (!config || !tokens) return;
		if (!tokens.access_token) return config;
		return {
			headers: {
				Authorization: `Bearer ${tokens.access_token}`,
				'Content-Type': 'application/json',
			},
			...config,
		};
	};
	const checkForRefresh = async <T extends string | number | symbol>(
		resp: AxiosResponse<Record<T, { message: string }>>,
	) => {
		if (resp.status === 401 && (resp.data as any).message === 'Token expired') {
			try {
				const { data: RefreshTokenResp } =
					await axios.post<RefreshTokenAPIResp>('/api/refresh', {
						data: {
							refresh_token: user.refresh_token,
						},
					});
				if (RefreshTokenResp.data) {
					dispatch(setUser(RefreshTokenResp.data));
				}
			} catch (err) {
				console.log(err);
			}
			if (tokens?.access_token) {
				return await axios(resp.config);
			}
		}
		return resp;
	};
	const get = async <T>(path: string, options?: AxiosRequestConfig) => {
		return axios.get<T>(
			`${import.meta.env.VITE_API_SERVER}${path}`,
			addAuthHeader(options),
		);
	};
	const post = async <T>(path: string, options?: AxiosRequestConfig) => {
		return axios.post<T>(
			`${import.meta.env.VITE_API_SERVER}${path}`,
			options?.data,
			addAuthHeader(options),
		);
	};
	const put = async <T>(path: string, options?: AxiosRequestConfig) => {
		return axios.put<T>(
			`${import.meta.env.VITE_API_SERVER}${path}`,
			options?.data,
			addAuthHeader(options),
		);
	};
	const patch = async <T>(path: string, options?: AxiosRequestConfig) => {
		return axios.patch<T>(
			`${import.meta.env.VITE_API_SERVER}${path}`,
			options?.data,
			addAuthHeader(options),
		);
	};
	const del = async <T>(path: string, options?: AxiosRequestConfig) => {
		return axios.delete<T>(
			`${import.meta.env.VITE_API_SERVER}${path}`,
			addAuthHeader(options),
		);
	};
	return { get, post, put, patch, delete: del };
};
export default useAPI;
