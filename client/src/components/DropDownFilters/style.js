import styled from "styled-components"
import { Button } from "../../global/styles/Button"

export const WrapperCategories = styled.div`
  width: 65%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`

export const ContainerCategories = styled.div`
  width: 100%;
  padding: 2rem 2rem 0.8rem 2rem;

  background: #fafafa;
  box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`
export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
  }
`

export const FilterButton = styled(Button)`
  font-size: 0.9rem;
  font-weight: 400;

  padding: 0.25em 0.6em;

  box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  display: flex;
  gap: 0.8rem;

  span {
    width: 10px;
  }
`
export const CategorieChoiceBtn = styled(Button)`
  padding: 0.5rem 0.6rem;
  border-radius: 10px;
  box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
  font-family: "Lato", sans-serif;
`

export const WrapperBtn = styled.div`
  display: flex;
  gap: 1.2rem;
`
