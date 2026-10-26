import React, { useEffect, useRef, useState } from "react";

// Remplace react-animate-on-scroll (non maintenu, incompatible React 19).
// Même rendu : un <div class="animated"> invisible qui reçoit la classe d'animation
// (ex. "fadeIn", définie dans styles/globalStyle.jsx) quand il entre dans le viewport,
// à `offset` px des bords. Seul le mode animateOnce est utilisé sur le site.
export default function ScrollAnimation({ animateIn, delay = 0, duration = 1, offset = 150, children }) {
	const ref = useRef(null);
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		let timeout;

		const observer = new IntersectionObserver(
			([entry]) => {
				clearTimeout(timeout);
				if (!entry.isIntersecting) return;
				timeout = setTimeout(() => {
					setAnimated(true);
					observer.disconnect();
				}, delay);
			},
			{ rootMargin: `-${offset}px 0px -${offset}px 0px` }
		);
		observer.observe(node);

		return () => {
			clearTimeout(timeout);
			observer.disconnect();
		};
	}, [delay, offset]);

	return (
		<div ref={ref} className={animated ? `animated ${animateIn}` : "animated"} style={animated ? { animationDuration: `${duration}s` } : { animationDuration: `${duration}s`, opacity: 0 }}>
			{children}
		</div>
	);
}
