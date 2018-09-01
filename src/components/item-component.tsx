import * as React from 'react';
import Item from '../Item';
import styled from 'styled-components'
import VendorComponent from './vendor';
import PriceComponent from './price';
import LanguageComponent from './language';

const Wrapper = styled.div`
	display: flex;
	padding: 5px;
	border-bottom: 1px solid lightgrey;
	background-color: ${(props: { available?: boolean }) => props.available ? 'white' : 'rgba(255, 0, 0, 0.3)'};
`

const Image = styled.img`
	max-height: 90px;
	padding: 0 20px;
`

const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 20px;
`

const ItemComponent = (item: Item) => {
	return (
		<Wrapper available={item.available}>
			<Image src={item.image} />
			<Title>{item.title}</Title>
			<PriceComponent {...item.price} />
			<LanguageComponent language={item.language} />
			<div>{item.nextAvailable && item.nextAvailable.toDateString()}</div>
			<VendorComponent vendor={item.vendor} />
		</Wrapper>
	)
}

export default ItemComponent;