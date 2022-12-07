import styled from "styled-components"
import * as StyledInput from "../../components/Form/Input"
import * as Typrography from "../../global/styles/Typography"

export const SubTittle = styled(Typrography.SubTittle)`
		margin-bottom: 2.6rem;
`

export const Logo = styled.img`
	position: fixed;
	left: 6vw;
	top: 5.5vh;

	width: 12%;
	max-width: 169px;
	min-width: 135px;

	@media (max-width: 1024px) {
			position: absolute;
	}
`

export const Input = styled(StyledInput.Input)`
	margin-bottom: 1.9rem;   
`

export const Wrapper = styled.div`
	width: 80%;
	max-width: 1635px;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 10vh;
	margin-bottom: 6vh;
`

export const Span = styled(Typrography.Text)`
	margin-top: 0.75rem;
`
export const Link = styled(Typrography.Text)`
	margin-left: 4px;
	cursor: pointer;
`
