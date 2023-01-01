import { User } from './Hooks/useAuth/types';

export interface IRootState {
	user: IRootUser;
}
export interface IRootUser {
	info: User | null;
	access_token: string | null;
	refresh_token: string | null;
}
