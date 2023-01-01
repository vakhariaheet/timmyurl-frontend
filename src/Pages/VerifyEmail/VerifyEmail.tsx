import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import './VerifyEmail.scss';

export interface VerifyEmailProps {}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
	const [searchParams] = useSearchParams();
	const authHook = useAuth();
	const navigate = useNavigate();
	const verifyToken = async () => {
		const token = searchParams.get('token');
		if (!token) return navigate('/register');
		const { data: VerifyEmailToken } = await authHook.verifyToken(token);
		if (VerifyEmailToken) { 
			
		}
	};
	useEffect(() => {}, []);
	return <div className=''></div>;
};

export default VerifyEmail;
