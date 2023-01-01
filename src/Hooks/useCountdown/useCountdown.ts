import React, { Dispatch, SetStateAction } from 'react';

export const useCountdown = (
	initialCount: number,
): [number, Dispatch<SetStateAction<number>>] => {
	const [count, setCount] = React.useState(initialCount);

	React.useEffect(() => {
		if (count <= 0) return;
		const interval = setInterval(() => {
			if (count <= 0) {
				clearInterval(interval);
				return;
			} else {
				setCount((count) => count - 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return [count, setCount];
};
