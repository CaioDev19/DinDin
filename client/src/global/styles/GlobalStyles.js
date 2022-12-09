import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`  
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	img {
		max-width: 100%;
	}

	@media (max-width: 1024px) {
		html {
			font-size: 12.5px;
		}
	}
	
	@media (min-width: 1025px) and (max-width: 1200px) {
		html {
			font-size: 13.5px;
		}
	}

	
	@media (min-width: 1201px) and (max-width: 1600px) {
		html {
			font-size: 15px;
		}
	}
`
