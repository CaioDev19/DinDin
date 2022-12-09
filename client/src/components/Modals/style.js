import styled from "styled-components"
import { Button } from "../../global/styles/Button"
import { Form } from "../Form"
import * as Typography from "../../global/styles/Typography"
import { Input } from "../Form/Input"
import { ScrollBar } from "../../global/styles/scrollBar"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`
export const Modal = styled(ScrollBar)`
  width: 80%;
  max-width: 611px;
  max-height: 93vh;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 3rem 0;

  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 20px;

  z-index: 2;

  font-family: "Rubik", sans-serif;

  &::-webkit-scrollbar-track {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  &::-webkit-scrollbar {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`
export const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const WrapperBtn = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 2.6rem;

  ${Button} {
    width: 100%;
  }
`
export const CloseModal = styled.img`
  position: absolute;
  top: 5.8vh;
  right: 2.8vw;

  width: 7%;
  cursor: pointer;
`
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  ${Button} {
    width: 50%;
    align-self: center;
  }
`

export const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`
export const SubTittle = styled(Typography.SubTittle)`
  margin-bottom: 3.25rem;
`
