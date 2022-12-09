import styled from "styled-components"
import * as Sc from "../../components/Form/Input"
import { Button as StyledButton } from "../../global/styles/Button"
import * as Typography from "../../global/styles/Typography"

export const Wrapper = styled.div`
  width: 88%;
  max-width: 1635px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5.6rem;

  margin-top: 10vh;
  margin-bottom: 6vh;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`

export const LeftContent = styled.div`
  width: 60%;
  max-width: 710px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
  }
`

export const RightContent = styled(LeftContent)`
  width: 40%;
  align-items: center;

  @media (max-width: 1024px) {
    text-align: left;
  }
`

export const SubTittle = styled(Typography.SubTittle)`
  margin-bottom: 3rem;
`

export const PurpleTittle = styled(Typography.Tittle)`
  color: ${({ theme }) => theme.COLORS.PURPLE};
`

export const Text = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  line-height: 2.1rem;
`

export const Button = styled(StyledButton)`
  margin-top: 3.2rem;
`

export const Input = styled(Sc.Input)`
  margin-bottom: 1.9rem;
`
