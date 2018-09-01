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
	justify-content: space-between;
`

const Image = styled.img`
	max-height: 90px;
	padding: 0 20px;
`

const Text = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 20px;
	width: ${(props: { width?: number}) => props.width ? `${props.width}%` : 'auto'};
`

const ItemComponent = (item: Item) => {
	return (
		<Wrapper available={item.available}>
			<Image src={item.image} />
			<Text width={40}>{item.title}</Text>
			<PriceComponent {...item.price} />
			<LanguageComponent language={item.language} />
			<Text>{item.nextAvailable && item.nextAvailable.toDateString()}</Text>
			<VendorComponent vendor={item.vendor} />
		</Wrapper>
	)
}

export default ItemComponent;