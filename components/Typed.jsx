import React, { useEffect, useRef } from "react";
import TypedJs from "typed.js";

// Remplace react-typed (non maintenu, incompatible React 19) : même balisage
// (<span className> contenant la cible), typed.js insère le curseur à côté de la cible.
export default function Typed({ strings, typeSpeed, className }) {
	const target = useRef(null);

	useEffect(() => {
		const typed = new TypedJs(target.current, { strings, typeSpeed });
		return () => typed.destroy();
	}, [strings, typeSpeed]);

	return (
		<span className={className}>
			<span ref={target} />
		</span>
	);
}
