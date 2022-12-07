import styled from "styled-components"
import { Button } from "./Button"

export const StyledCard = styled.div`
	width: 100%;
	max-width: 513px;
	min-width: 310px;
	padding: 3.75rem 2rem;

	display: flex;
	flex-direction: column;
	justify-content: space-around;

	background: ${({ theme }) => theme.COLORS.WHITE};

	${Button} {
		width: 100%;
	}
`