import React from 'react';
import { useRouter } from 'next/router';
import { FacebookProvider, LoginButton } from 'react-facebook';

import styles from './register.module.scss';
import { signIn, useSession } from 'next-auth/react';
const Register: React.FC = () => {
	const { data: session } = useSession();

	return (
		<main className={styles.container}>
			{/* 1211465129648146 */}
			<FacebookProvider appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}>
				<LoginButton
					scope='public_profile,email'
					onClick={() => console.log('clicked')}
					onCompleted={(data: any) => console.log(data)}
				>
					Login with Facebook
				</LoginButton>
			</FacebookProvider>
			<button onClick={() => signIn()}>Sign in</button>
		</main>
	);
};
export default Register;
