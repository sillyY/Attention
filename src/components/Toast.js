import React from "react"
import styled from "styled-components"
import { Flex } from "rebass"

const Container = styled(Flex)`
	padding: 20px 50px;
	background: rgba(0, 0, 0, .5);
	color: #fff;
	font-size: 18px;
	border-radius: 10px;
	position: absolute;

	left: 50%;
	top: 50%;
	z-index: 99;
	transform: translate("-50%", "-50%");
`

export default ({ content }) => <Container>{content}</Container>
