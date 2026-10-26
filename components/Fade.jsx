import React, { cloneElement, isValidElement } from "react";

// Remplace react-reveal/Fade (non maintenu, incompatible React 19) par une animation CSS
// (keyframes revealFromTop / revealFromLeft dans styles/globalStyle.jsx).
// Comme react-reveal, l'animation est posée directement sur un élément DOM enfant,
// sinon l'enfant est enveloppé dans un <div class="react-reveal">.
export default function Fade({ top, left, delay = 0, duration = 1000, children }) {
	const style = {
		animationName: top ? "revealFromTop" : left ? "revealFromLeft" : "revealFade",
		animationDuration: `${duration}ms`,
		animationDelay: `${delay}ms`,
		animationFillMode: "both",
	};

	if (isValidElement(children) && typeof children.type === "string") {
		return cloneElement(children, {
			className: children.props.className ? `${children.props.className} react-reveal` : "react-reveal",
			style: { ...children.props.style, ...style },
		});
	}

	return (
		<div className="react-reveal" style={style}>
			{children}
		</div>
	);
}
