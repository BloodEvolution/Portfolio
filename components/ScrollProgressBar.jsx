import React, { useEffect, useState } from "react";

// Remplace react-progressbar-on-scroll (non maintenu) : barre fixe en haut de page
// dont le remplissage suit la progression du scroll.
export default function ScrollProgressBar({ color, height = 4 }) {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		let ticking = false;

		function update() {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(() => {
				const scrollable = document.documentElement.offsetHeight - window.innerHeight;
				setScroll(scrollable > 0 ? Math.floor((window.scrollY / scrollable) * 100) : 0);
				ticking = false;
			});
		}

		document.addEventListener("scroll", update);
		update();
		return () => document.removeEventListener("scroll", update);
	}, []);

	return <div style={{ position: "fixed", left: 0, right: 0, top: 0, height, zIndex: 999, background: `linear-gradient(to right, ${color} ${scroll}%, transparent 0)` }} />;
}
