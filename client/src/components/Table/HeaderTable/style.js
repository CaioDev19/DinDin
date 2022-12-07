import styled from "styled-components"
import * as Typography from "../../../global/styles/Typography"

export const HeaderTable = styled.thead`
	background: #FAFAFA;
	box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	width: 100%;
`

export const TableItemHeader = styled(Typography.Text)`
	padding: 1.3rem 1.7rem;
	line-height: 1.1rem;
`

export const DateItem = styled(TableItemHeader)`
	cursor: pointer;
`

export const Arrow = styled.img`
	width: 10%;
	min-width: 10px;
	margin-left: 0.2rem;
`