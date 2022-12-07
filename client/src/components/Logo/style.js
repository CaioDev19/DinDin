import styled from "styled-components"

export const Logo = styled.img`
	position: fixed;
	left: 7vw;
	top: 4vh;

	width: 12%;
	max-width: 169px;
	min-width: 135px;

	z-index: 1;

	@media (max-width: 1024px) {
		position: absolute;
	}
`