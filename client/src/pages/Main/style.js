import styled from "styled-components"
import { Table } from "../../components/Table/style"
import { ScrollBar } from "../../global/styles/scrollBar"
import { Button } from "../../global/styles/Button"

export const Container = styled.div`
	background: ${({ theme }) => theme.COLORS.WHITE};
	border-radius: 60px 60px 0px 0px;
	height: 80vh;
	
	position: relative;
	top: 14vh;

	z-index: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	padding-top: 7rem;

	font-family: 'Rubik', sans-serif;
`
export const LeftContent = styled(ScrollBar)`
	width: 100%;

	font-family: 'Lato', sans-serif;

	overflow: auto;
	height: 70vh;

	&::-webkit-scrollbar-corner {
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(122,153,217)),
      color-stop(0.72, rgb(73,125,189)),
      color-stop(0.86, rgb(28,58,148)));
	}
	

	@media screen and (max-width: 767px) {
    width: 100%;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
    
    & > ${Table} {
      table-layout: auto;
      margin-bottom: 0;
    }

    & > .table > thead > tr > th,
    & > .table > tbody > tr > th,
    & > .table > tfoot > tr > th,
    & > .table > thead > tr > td,
    & > .table > tbody > tr > td,
    & > .table > tfoot > tr > td {
      white-space: nowrap;
    }

    &::-webkit-scrollbar-track {
      border-top-right-radius: 0px;
    }

    &::-webkit-scrollbar{
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px
    }

    &::-webkit-scrollbar-thumb {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
	}

	@media (max-width: 1024px) {
    height: 49vh;
	}
`

export const RightContent = styled.div`
	width: 20%;
	max-width: 326px;
	min-width: 200px;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1rem; 

  @media (max-width: 1024px) {
    width: 100%;
	}
`

export const WrapperLeftContent = styled.div`
	width: 80%;

	display: flex;
	flex-direction: column;
	gap: 3.8rem;

  @media (max-width: 1024px) {
    width: 100%;
	}
`

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 2.5rem;

	width: 80%;
	max-width: 1584px;

	position: relative;

	@media (max-width: 1024px) {
    flex-wrap: wrap;

    ${WrapperLeftContent} {
      -webkit-box-ordinal-group: 2;
      -moz-box-ordinal-group: 2;
      -ms-flex-order: 1;
      -webkit-order: 1;
      order: 1;
    }
	}
`

export const Filter = styled(Button)`
	padding: 0.7em 0.9em;

	position: absolute;
	top: -6.8vh;
	left: 0.2vw;

	background: #FAFAFA;
	box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.25rem;

	font-family: 'Lato', sans-serif;
`