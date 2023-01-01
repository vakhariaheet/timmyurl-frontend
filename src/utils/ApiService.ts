import axios, { AxiosRequestConfig } from 'axios';
export default class ApiService {
	private static instance: ApiService;
	private static token = '';
	private constructor() {
		localStorage.getItem('timmyurl-access-token') &&
			(ApiService.token = localStorage.getItem(
				'timmyurl-access-token',
			) as string);
	}

	public static getInstance() {
		if (!ApiService.instance) {
			ApiService.instance = new ApiService();
		}

		return ApiService.instance;
	}

	public static get(url: string, externalConfig: AxiosRequestConfig) {
		return axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER}${url}`,
			headers: {
				Authorization: `Bearer ${ApiService.token}`,
				'Content-Type': 'application/json',
			},
			...externalConfig,
		});
	}
	public static post<T>(url: string, externalConfig: AxiosRequestConfig) {
		return axios.post<T>(
			`${import.meta.env.VITE_API_SERVER}${url}`,
			externalConfig.data,
			{
				headers: {
					Authorization: `Bearer ${ApiService.token}`,
					'Content-Type': 'application/json',
				},
				...externalConfig,
			},
		);
	}
	public static put(url: string, externalConfig: AxiosRequestConfig) {
		return axios({
			method: 'put',
			url: `${import.meta.env.VITE_API_SERVER}${url}`,
			headers: {
				Authorization: `Bearer ${ApiService.token}`,
				'Content-Type': 'application/json',
			},
			...externalConfig,
		});
	}
}
