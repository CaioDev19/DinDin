import banner from "../../../assets/images/mainBanner.svg"
import styled from "styled-components"

export const UnprotectedRoutesContainer = styled.div`
  background: linear-gradient(
      180deg,
      rgba(5, 237, 227, 0.5) 0%,
      rgba(100, 95, 251, 0.5) 100%,
      rgba(100, 95, 251, 0.5) 100%
    ),
    url(${banner});
  background-size: cover;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    position: relative;
  }

  font-family: "Rubik", sans-serif;
  color: ${({ theme }) => theme.COLORS.WHITE};
`
