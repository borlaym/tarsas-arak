import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	flex-direction: column;
`

const Strikethrough = styled.div`
	text-decoration: line-through;
`


export default function PriceComponent(props: { original: number, discounted: number }) {
	if (props.discounted > 0) {
		return (
			<Wrapper>
				<Strikethrough>{props.original}</Strikethrough>
				<div>{props.discounted}</div>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<div>{props.original}</div>
		</Wrapper>
	)
	
}