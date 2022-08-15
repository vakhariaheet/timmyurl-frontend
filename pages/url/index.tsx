import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { QRCode } from 'react-qrcode-logo';
import styles from './url.module.scss';
import html2canvas from 'html2canvas';
import Logo from '../../Components/Logo/Logo';
const URLInfo: NextPage = () => {
	const router = useRouter();
	const ref = React.useRef<HTMLCanvasElement>(null);
	const { url } = router.query;
	const download = () => {
		html2canvas(document.querySelector('#react-qrcode-logo') as any).then(
			function (canvas) {
				console.log(canvas);
				const link = document.createElement('a');

				link.download = `qrcode (${url}).png`;
				console.log(canvas);
				link.href = canvas.toDataURL();
				link.click();
				URL.revokeObjectURL(link.href);
			},
		);
	};
	const onCopy = async () => {
		if (typeof url !== 'string') return;
		await navigator.clipboard.writeText(url);
		alert('Copied to clipboard');
	};
	if (typeof url !== 'string') return <div>No URL</div>;
	return (
		<div className={styles.container}>
			<Logo />
			<div className={styles.qrcontainer}>
				<div className={styles.qrcode}>
					{url && (
						<QRCode
							value={url as string}
							logoImage={'/logo.png'}
							logoHeight={30}
							logoWidth={30}
							size={231}
							removeQrCodeBehindLogo={true}
							qrStyle='dots'
							eyeRadius={10}
							quietZone={20}
						/>
					)}

					<svg
						viewBox='0 0 512 512'
						className={styles.download}
						height={30}
						width={30}
						onPointerDown={download}
					>
						<path
							xmlns='http://www.w3.org/2000/svg'
							d='m512 480c0 17.673-14.327 32-32 32h-448c-17.673 0-32-14.327-32-32s14.327-32 32-32h448c17.673 0 32 14.327 32 32zm-278.627-101.372c6.249 6.249 14.437 9.373 22.627 9.373 8.188 0 16.38-3.125 22.627-9.373l113.378-113.377c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-58.75 58.75v-246.746c0-17.673-14.327-32-32-32s-32 14.327-32 32v246.746l-58.75-58.75c-12.497-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255z'
							fill='#000000'
						/>
					</svg>
				</div>
			</div>

			<div className={styles.shorturl}>
				<span>{url}</span>
				<a
					href={url}
					className={styles.copy}
					target={'_blank'}
					rel='noreferrer'
				>
					Open
				</a>
			</div>
			<div className={styles.btn} onClick={onCopy}>
				Copy
			</div>
			<a href='https://timmyurl.in/' className={styles.link}>
				Create new link
			</a>
		</div>
	);
};
export default URLInfo;
