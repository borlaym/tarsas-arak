import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	flex-direction: column;
`

const FinalPrice = styled.span`
	display: block;
	text-align: right;
	font-family: 'Roboto', sans-serif;
	color: rgba(0,0,0,0.87);
    line-height: 1.6;
    font-size: 24px;
`

const OriginalPrice = styled.span`
	display: block;
	width: 100%;
	text-decoration: line-through;
	text-align: right;
	font-family: 'Roboto', sans-serif;
	color: rgba(0,0,0,0.57);
    line-height: 1.6;
    font-size: 16px;
`

function formatPrice(value: number) {
	if (value < 1000) {
		return value + ' Ft'
	}
	return String(value).slice(0, -3) + ' ' + String(value).slice(-3) + ' Ft'
}

export default function PriceComponent(props: { original: number, discounted: number }) {
	if (props.discounted > 0) {
		return (
			<Wrapper>
				<OriginalPrice>{formatPrice(props.original)}</OriginalPrice>
				<FinalPrice>{formatPrice(props.discounted)}</FinalPrice>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<FinalPrice>{formatPrice(props.original)}</FinalPrice>
		</Wrapper>
	)
	
}