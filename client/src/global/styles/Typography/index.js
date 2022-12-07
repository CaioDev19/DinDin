import styled from "styled-components"

export const Tittle = styled.h1`
	font-weight: 700;
	font-size: ${({ size, theme }) => size ? theme.FONT_SIZE[size.toUpperCase()] : "1rem"};
	line-height: 3.8rem;
`

export const SubTittle = styled.h2`
	font-weight: ${({ weight }) => weight};
	font-size: ${({ size, theme }) => size ? theme.FONT_SIZE[size.toUpperCase()] : "1rem"};
	line-height: 2rem;
	color: ${({ color, theme }) => color ? theme.COLORS[color.toUpperCase()] : theme.COLORS.BLACK};
	text-align: ${({ position }) => position ? position : "center"};
`

export const Text = styled.p`
	text-decoration: none;
	font-weight: ${({ weight }) => weight};
	font-size: ${({ size, theme }) => size ? theme.FONT_SIZE[size.toUpperCase()] : "1rem"};
	color: ${({ color, theme }) => color ? theme.COLORS[color.toUpperCase()] : theme.COLORS.BLACK}; 
	line-height: 2.1rem;
	text-align: ${({ position }) => position ? position : "center"};
`