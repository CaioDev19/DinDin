import styled from "styled-components"
import logo from "../../assets/images/background-header.png"

export const WrapperUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  position: absolute;
  right: 7vw;
  top: 4vh;

  width: 18%;
  max-width: 138px;
  min-width: 135px;
`

export const UserImage = styled.img`
  border: 0.2rem solid white;
  border-radius: 50%;
  width: 40%;

  padding: 0 0.2rem;

  cursor: pointer;
`

export const LogOutImage = styled.img`
  width: 20%;
  cursor: pointer;
`
export const Banner = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: cover;

  position: fixed;
  top: 0;
  width: 100%;

  height: 20vh;
`
