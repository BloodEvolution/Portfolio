import React from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import Lottie from "@/components/Lottie";

import ScrollDownLottie from "@/public/lotties/scroll-down.json";
import ScrollDownLottieLight from "@/public/lotties/scroll-down-light.json";
import { scrollToSection } from "./SmoothScroll";

const ContainerLottie = styled.div`
	width: 80px;
	height: 80px;
	transition: all 0.3s ease;
	z-index: 1;
	position: absolute;
	bottom: 40px;

	@media (max-width: 601px) {
		display: none;
	}
`;

const rendererSettings = {
	preserveAspectRatio: "xMidYMid slice",
};

export default function ScrollDownAnimation() {
	const theme = useTheme();

	return (
		<ContainerLottie>
			<a style={{ textDecoration: "none" }} href="#section-services" onClick={scrollToSection}>
				<Lottie style={{ pointerEvents: "none" }} animationData={theme.name == "dark" ? ScrollDownLottie : ScrollDownLottieLight} rendererSettings={rendererSettings} />
			</a>
		</ContainerLottie>
	);
}
