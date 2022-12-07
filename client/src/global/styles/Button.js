import styled from "styled-components"

export const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  background: ${({ background, theme }) => background ? theme.COLORS[background.toUpperCase()] : theme.COLORS.PURPLE};
  border-radius: 5px;
  padding: 1em ${({ spacer, theme }) => spacer ? theme.SPACERS[spacer.toUpperCase()] : "7"}em;

  font-weight: 700;
  font-size: ${({ size, theme }) => size ? theme.FONT_SIZE[size.toUpperCase()] : theme.FONT_SIZE.SMALL};
  color: ${({ letterColor, theme }) => letterColor ? theme.COLORS[letterColor.toUpperCase()] : theme.COLORS.WHITE};
  line-height: 1.1em;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 1em 4.5em${({ spacer, theme }) => spacer ? Math.floor(theme.SPACERS[spacer.toUpperCase()] / 2) : "4.5"}em;
  }
`