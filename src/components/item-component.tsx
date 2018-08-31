import * as React from 'react';
import Item from '../Item';
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
`

const ItemComponent = (item: Item) => {
	return (
		<Wrapper>
			<img src={item.image} />
			<div>{item.vendor}</div>
			<div>{item.title}</div>
			<div>{item.price.original}</div>
			<div>{item.price.discounted}</div>
			<div>{item.language}</div>
			<div>{item.available}</div>
			<div>{item.nextAvailable && item.nextAvailable.toDateString()}</div>
		</Wrapper>
	)
}

export default ItemComponent;