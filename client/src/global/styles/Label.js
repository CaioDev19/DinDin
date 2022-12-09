import styled from "styled-components"
import { StyledInput } from "../../components/Form/Input/style"

export const Label = styled.label`
  font-size: ${({ labelSize, theme }) =>
    labelSize ? theme.FONT_SIZE[labelSize.toUpperCase()] : "1.15rem"};
  line-height: 1.3rem;
  color: ${({ labelColor, theme }) =>
    labelColor
      ? theme.COLORS[labelColor.toUpperCase()]
      : theme.COLORS.GRAY_500};
  font-weight: ${({ labelWeight, theme }) => (labelWeight ? labelWeight : 400)};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  ${StyledInput} {
    text-decoration: none;
    font-weight: 400;
    font-size: ${({ theme }) => theme.FONT_SIZE.INTERMEDIATE};
    color: ${({ theme }) => theme.COLORS.BLACK};
    line-height: 2.1rem;
  }
`
