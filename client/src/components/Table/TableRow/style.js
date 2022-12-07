import styled from "styled-components";
import * as Typography from "../../../global/styles/Typography"
import popup from "../../../assets/images/deletePopUp.svg"
import { Button } from "../../../global/styles/Button"

export const Icons = styled.img`
	cursor: pointer;

	text-align: center;

	width: 100%;
	max-width: 26px;
	min-width: 12px;
`

export const TableItem = styled(Typography.Text)`
	padding: 1.3rem 1.7rem;
	border-bottom: 1px solid #E0E0E0;
	line-height: 1.1rem;

	${Icons}:nth-child(1) {
		margin-right: 13px;
	}
`

export const PopUp = styled.div`
	background-image: url(${popup});
	background-repeat: no-repeat;
	background-size: cover;
	
	position: absolute;
	top: 1.8rem;
	right: 2.4rem;
	
	padding: 10px 15px;

	font-size: 14px;
	font-weight: 400;
	font-family: 'Rubik';
	z-index: 1;
	
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: 8px;

	@media (max-width: 650px) {
		top: 4.5rem;
		right: -0.3rem;
	}
	@media (min-width: 651px) and (max-width: 1024px) {
		top: 4.5rem;
		right: 1rem;
	}
	
	@media (min-width: 1025px) and (max-width: 1200px) {
		top: 2rem;
		right: -0.15rem;
	}

	
	@media (min-width: 1201px) and (max-width: 1600px) {
		right: .4rem;
	}
`
export const StyledButton = styled(Button)`
	box-sizing: content-box;
	padding: 2px 10px;
	border-radius: 10px;
	width: 37px;
	height: 15px;
	font-weight: 400;
`
export const WrapperBtn = styled.div`
	display: flex;
	justify-content: center;
	gap: 7px;
`

export const Wrapper = styled.div`
	position: relative

`
