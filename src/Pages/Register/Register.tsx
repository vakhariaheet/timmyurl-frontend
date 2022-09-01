import React from 'react';
import './Register.scss';
import {} from 'react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	return (
		<section className='register'>
			<FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_ID as string}
				autoLoad={true}
				fields='name,email,picture'
				onClick={() => console.log('clicked')}
				callback={(data: any) => console.log(data)}
			/>
			<GoogleLogin onSuccess={(data) => console.log(data)} />
		</section>
	);
};

export default Register;
