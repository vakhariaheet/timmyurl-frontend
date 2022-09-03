import React, { useEffect } from 'react';
import './Register.scss';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	useEffect(() => {
		localStorage.setItem(`fblst_${process.env.REACT_APP_FACEBOOK_ID}`, '');
	}, []);
	return (
		<section className='register'>
			<div className='register-box'>
				<FacebookLogin
					appId={process.env.REACT_APP_FACEBOOK_ID as string}
					autoLoad={true}
					scope='pages_show_list'
					fields='name,email,picture'
					onClick={() => console.log('clicked')}
					callback={(data: any) => console.log('facebook', data)}
				/>
				<GoogleLogin onSuccess={(data) => console.log(data)} />
			</div>
		</section>
	);
};

export default Register;
