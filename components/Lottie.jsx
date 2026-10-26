import React, { useEffect, useRef } from "react";

// Remplace react-lottie (non maintenu, incompatible React 19) en pilotant lottie-web directement.
// lottie-web est chargé côté client uniquement : il accède à `document` dès son import.
// La version "light" (sans moteur d'expressions) suffit à ces animations et évite eval(), interdit par la CSP.
export default function Lottie({ animationData, loop = true, autoplay = true, rendererSettings, style }) {
	const container = useRef(null);

	useEffect(() => {
		let animation;
		let cancelled = false;

		import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
			if (cancelled || !container.current) return;
			animation = lottie.loadAnimation({ container: container.current, renderer: "svg", loop, autoplay, animationData, rendererSettings });
		});

		return () => {
			cancelled = true;
			animation?.destroy();
		};
	}, [animationData, loop, autoplay, rendererSettings]);

	return <div ref={container} aria-hidden="true" style={{ width: "100%", height: "100%", overflow: "hidden", margin: "0 auto", outline: "none", ...style }} />;
}
