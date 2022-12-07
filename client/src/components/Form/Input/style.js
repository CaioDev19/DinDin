import styled from "styled-components"

export const StyledInput = styled.input`
	all: unset;
	box-sizing: border-box;
	cursor: pointer;

	background: ${({ theme }) => theme.COLORS.WHITE};
	border: 1px solid ${({ theme }) => theme.COLORS.GRAY_400};;
	border-radius: 5px;
	
	padding: 1.3rem 0.5rem;

	&::placeholder {
		text-decoration: none;
		font-weight: 700;
		font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
		color: ${({ theme }) => theme.COLORS.RED}; 
		line-height: 2.1rem;
		opacity: 0.8;
	}

	&:focus {
		box-shadow: 0px 0px 18px -3px ${({ theme }) => theme.COLORS.PURPLE};
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	@media (max-width: 1024px) {
		padding: 0.7rem 0.5rem;
	}
`

export const EyeIcon = styled.img`
	position: absolute;
	top: 4rem;
	right: 0.6rem;
	width: 6%;
	cursor: pointer;

	@media (max-width: 1024px) {
		top: 3.4rem;
	}
`