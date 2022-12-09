import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.COLORS.PURPLE};
  border-radius: 5px;

  padding: 1.47rem
    ${({ spacer, theme }) =>
      spacer ? theme.SPACERS[spacer.toUpperCase()] : 0}rem;

  width: ${({ width }) => width};
  align-self: center;

  margin-top: ${({ spacer, theme }) =>
    spacer ? theme.SPACERS[spacer.toUpperCase()] : 0}rem;

  position: relative;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
  }
`
