import React, { HTMLProps } from 'react';
import styles from './Logo.module.scss';

export interface LogoProps {
	type?: 'navbar' | 'display';
	containerProps?: HTMLProps<HTMLAnchorElement>;
	logoProps?:
		| [
				HTMLProps<HTMLSpanElement>,
				HTMLProps<HTMLSpanElement>,
				HTMLProps<HTMLSpanElement>,
		  ]
		| HTMLProps<HTMLSpanElement>;
}

const Logo: React.FC<LogoProps> = ({
	containerProps = {},
	logoProps = {},
	type = 'display',
}) => {
	const getLogoProps = (index: 1 | 2 | 0) => {
		if (Array.isArray(logoProps)) {
			return logoProps[index];
		}
		return logoProps;
	};
	return (
		<a
			href={'https://timmyurl.in'}
			tabIndex={0}
			{...containerProps}
			className={`${styles.logo} ${
				type === 'navbar' ? styles.logoNavbar : styles.logoDisplay
			} ${containerProps.className}`}
		>
			<span
				{...getLogoProps(0)}
				className={`${styles.timmy} ${
					type === 'display' ? styles.spanDisplay : styles.spanNavbar
				} ${getLogoProps(0).className}`}
			>
				timmy
			</span>
			<span
				{...getLogoProps(1)}
				className={`${styles.url} ${
					type === 'display' ? styles.spanDisplay : styles.spanNavbar
				} ${getLogoProps(1).className}`}
			>
				url
			</span>
			<span
				{...getLogoProps(2)}
				className={`${styles.suffix} ${
					type === 'display' ? styles.spanDisplay : styles.spanNavbar
				} ${getLogoProps(2).className}`}
			>
				.in
			</span>
		</a>
	);
};

export default Logo;
