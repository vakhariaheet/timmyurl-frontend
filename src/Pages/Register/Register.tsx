import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Logo from '../../Components/Logo/Logo';

import useAuth from '../../Hooks/useAuth/useAuth';
export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);
	const auth = useAuth();
	const login: any = useGoogleLogin({
		async onSuccess(tokenResponse) {
			console.log(tokenResponse);
			try {
				await auth.googleLogin(tokenResponse);
				navigate('/');
			} catch (err) {
				console.log(err);
			}
		},
	});
	const onFacebookLogin = async (response: any) => {
		try {
			await auth.facebookLogin(response);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};
	const navigate = useNavigate();
	const onRegister = async () => {
		if (!name || !password || !email) return;
		try {
			await auth.register({
				name,
				email,
				password,
			});
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		localStorage.setItem(`fblst_${process.env.REACT_APP_FACEBOOK_ID}`, '');
		sessionStorage.setItem(`fbssls_${process.env.REACT_APP_FACEBOOK_ID}`, '');
	}, []);
	return (
		<div className='register--container'>
			<nav>
				<Logo type='navbar' />
			</nav>
			<section className='register'>
				<div className='register-box'>
					<FacebookLogin
						appId={process.env.REACT_APP_FACEBOOK_ID as string}
						fields='name,email,picture'
						onClick={() => console.log('clicked')}
						callback={onFacebookLogin}
						render={(renderProps: any) => (
							<button
								className='register-box__facebook register--oauth '
								onClick={renderProps.onClick}
							>
								<svg
									width={47}
									height={47}
									viewBox='0 0 47 47'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M46.34 23.58C46.34 34.9205 38.0312 44.32 27.17 46.024V30.1475H32.4639L33.4712 23.58H27.17V19.3182C27.17 17.521 28.0504 15.77 30.8726 15.77H33.7375V10.1787C33.7375 10.1787 31.1371 9.73499 28.6512 9.73499C23.462 9.73499 20.07 12.8803 20.07 18.5745V23.58H14.3012V30.1475H20.07V46.024C9.20877 44.32 0.899994 34.9205 0.899994 23.58C0.899994 11.0325 11.0725 0.859985 23.62 0.859985C36.1675 0.859985 46.34 11.0325 46.34 23.58Z'
										fill='#1877F2'
									/>
									<path
										d='M32.4639 30.1475L33.4713 23.58H27.17V19.3181C27.17 17.5214 28.0502 15.77 30.8726 15.77H33.7375V10.1787C33.7375 10.1787 31.1375 9.73499 28.6517 9.73499C23.4619 9.73499 20.07 12.8803 20.07 18.5745V23.58H14.3013V30.1475H20.07V46.0239C21.2268 46.2054 22.4123 46.3 23.62 46.3C24.8277 46.3 26.0132 46.2054 27.17 46.0239V30.1475H32.4639Z'
										fill='white'
									/>
								</svg>
								<span>Facebook</span>
							</button>
						)}
					/>
					<button
						className='register-box__google register--oauth '
						onClick={login}
					>
						<svg
							width={47}
							height={47}
							viewBox='0 0 47 47'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.9705 28.1199L9.38876 34.0247L3.60768 34.147C1.87998 30.9425 0.900002 27.2761 0.900002 23.38C0.900002 19.6125 1.81626 16.0596 3.44038 12.9313H3.44162L8.58841 13.8749L10.843 18.9908C10.3711 20.3665 10.1139 21.8433 10.1139 23.38C10.1141 25.0478 10.4162 26.6457 10.9705 28.1199Z'
								fill='#FBBB00'
							/>
							<path
								d='M45.943 19.1356C46.2039 20.51 46.34 21.9294 46.34 23.38C46.34 25.0066 46.169 26.5933 45.8432 28.1238C44.7372 33.3319 41.8472 37.8796 37.8438 41.0979L37.8425 41.0966L31.3599 40.7659L30.4424 35.0384C33.0989 33.4805 35.1749 31.0424 36.2685 28.1238H24.1195V19.1356H36.4457H45.943Z'
								fill='#518EF8'
							/>
							<path
								d='M37.8425 41.0966L37.8437 41.0979C33.9501 44.2275 29.0041 46.1 23.62 46.1C14.9677 46.1 7.44513 41.2639 3.60767 34.1471L10.9705 28.1201C12.8891 33.2408 17.8289 36.886 23.62 36.886C26.1092 36.886 28.4412 36.2131 30.4422 35.0384L37.8425 41.0966Z'
								fill='#28B446'
							/>
							<path
								d='M38.1221 5.89054L30.7618 11.9163C28.6908 10.6218 26.2427 9.874 23.62 9.874C17.6978 9.874 12.6657 13.6864 10.8431 18.9908L3.44163 12.9313H3.44038C7.22167 5.64089 14.8391 0.659973 23.62 0.659973C29.1327 0.659973 34.1873 2.62366 38.1221 5.89054Z'
								fill='#F14336'
							/>
						</svg>
						<span>Google</span>
					</button>

					<div className='register--line'>
						<div className='register--line--left'></div>
						<div className='register--line--text'>or</div>
						<div className='register--line--right'></div>
					</div>
					<form className='register--form' onSubmit={(e) => e.preventDefault()}>
						<label htmlFor='name'>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Full Name'
								id='name'
								name='name'
								className='register--input'
							/>
						</label>
						<label htmlFor='email'>
							<input
								type='text'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Email'
								id='email'
								autoComplete='email'
								name='email'
								className='register--input'
							/>
						</label>
						<label htmlFor='password'>
							<div className='register--showPassword--container'>
								<span
									tabIndex={0}
									onClick={() =>
										setShowPassword((prevShowPassword) => !prevShowPassword)
									}
									className='register--showPassword'
								>
									{showPassword ? 'Hide' : 'Show'} Password
								</span>
							</div>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
								id='password'
								autoComplete='new-password'
								name='password'
								className='register--input'
							/>
						</label>

						<button
							type='submit'
							className='register--submit'
							onClick={onRegister}
						>
							Register
						</button>
					</form>
					<p className='register--link'>
						Already have an account? <Link to='/login'>Login</Link>
					</p>
					<p className='register--info'>
						By clicking Register, you agree to our <a href='#'>Terms of Use</a>{' '}
						and <a href='#'>Privacy Policy</a>
					</p>
				</div>
			</section>
		</div>
	);
};

export default Register;
