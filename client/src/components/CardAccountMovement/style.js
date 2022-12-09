import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  padding: 1.2rem 0 1.5rem 0;
  background: #fafafa;
  box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const WrapperText = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 0.8rem;
  margin-bottom: 0.9rem;
`

export const SubContainerCard = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const SubContainerText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Line = styled.div`
  min-height: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  margin-bottom: 1.1rem;
`
