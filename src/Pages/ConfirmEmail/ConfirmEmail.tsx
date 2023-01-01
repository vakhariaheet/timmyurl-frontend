import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useCountdown } from '../../Hooks/useCountdown/useCountdown';
import './ConfirmEmail.scss';
import useAuth from '../../Hooks/useAuth/useAuth';

export interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = () => {
	const location = useLocation();
	const email = (location.state as any)?.email;
	const [count, setCount] = useCountdown(10);
	const navigate = useNavigate();
	const authHook = useAuth();
	const loaderTransitions = useTransition(count > 0, {
		from: { opacity: 0, transform: 'translateY(100%)' },
		enter: { opacity: 1, transform: 'translateY(0%)' },
		leave: {
			opacity: 0,
			transform: 'translateY(-100%)',
		},
	});
	useEffect(() => {
		if (!email) return navigate('/register');
	}, []);
	const resendEmail = async () => {
		await authHook.resendToken();
		setCount(80);
	};
	const wrongEmail = () => {};
	return (
		<div className='register--container'>
			<nav>
				<Logo type='navbar' />
			</nav>
			<section className='register'>
				<div className='register-box'>
					<div className='confirmemail-icon'>
						<svg
							width={456}
							height={513}
							viewBox='0 0 456 513'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M312.052 80.7107L244.477 14.3877C235.078 5.8707 220.753 5.8707 211.354 14.3877L143.779 80.7107'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M440.342 206.625L408.618 238.293'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M266.156 380.502L447.83 480.337'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M47.212 238.293L15.488 206.625'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M189.673 380.502L8.00037 480.337'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M342.246 505H423.167C436.788 505 447.83 493.958 447.83 480.337V224.467C447.83 217.756 445.132 211.326 440.342 206.625L408.618 175.489'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M8.00012 342.739V480.337C8.00012 493.958 19.0421 505 32.6631 505H309.56'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M47.212 175.489L15.488 206.625C10.699 211.326 8 217.756 8 224.467V310.052'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M408.618 123.5V105.711C408.618 91.9038 397.425 80.7108 383.618 80.7108H72.2122C58.4052 80.7108 47.2122 91.9038 47.2122 105.711V238.293L189.673 380.502L216.037 366.015C223.434 361.949 232.396 361.949 239.793 366.015L266.156 380.502L408.618 238.293V155.425'
								stroke='#0A58FF'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M251.522 205.723C251.522 225.776 239.215 240.792 224.482 240.792C209.749 240.792 196.719 225.984 196.719 205.932C196.719 185.879 210.472 172.519 225.206 172.519C239.939 172.519 251.522 185.671 251.522 205.723Z'
								stroke='#EF5D60'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M226.494 274.735C197.189 273.924 170.469 254.09 162.534 223.922C153.376 189.1 173.406 152.73 207.715 141.809C244.002 130.257 282.593 150.672 293.557 187C297.437 201.535 295.172 214.18 290.032 227.107C287.993 232.232 281.27 244.231 266.316 244.231C258.152 244.231 251.346 236.407 251.391 227.395L251.686 167.676'
								stroke='#EF5D60'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M293.557 187C297.437 201.535 295.172 214.181 290.032 227.107'
								stroke='#EF5D60'
								strokeWidth={15}
								strokeMiterlimit={10}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>

					<div className='confirmemail__content'>
						<p>
							We have sent you an email at <span className='bold'>{email}</span>{' '}
						</p>
						<p>
							Please check your inbox and click on the link to verify your
							account.
						</p>
						<p>
							If you don't see the email in your inbox, please check your spam
							folder.
						</p>
						<p>Didn't receive the email? </p>
						{loaderTransitions((style, item) => {
							return (
								item && (
									<animated.p className='faded' style={style}>
										Resend will be active after {count}s
									</animated.p>
								)
							);
						})}
						<button
							className='confirmemail__resend'
							onClick={resendEmail}
							disabled={count > 0}
						>
							Resend Email
						</button>

						<button>Wrong email?</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ConfirmEmail;
