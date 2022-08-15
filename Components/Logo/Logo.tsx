import Link from 'next/link';
import React from 'react';
import styles from './Logo.module.scss';

export interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
	return (
		<a href={'https://timmyurl.in'} className={styles.logo} tabIndex={0}>
			<span className={styles.timmy}>timmy</span>
			<span className={styles.url}>url</span>
			<span className={styles.suffix}>.in</span>
		</a>
	);
};

export default Logo;
