import * as React from 'react';
import Item from '../Item';
import styled from 'styled-components'
import VendorComponent from './vendor';
import PriceComponent from './price';
import LanguageComponent from './language';

const IMAGE_HEIGHT = 80;

const Wrapper = styled.li`
	display: flex;
	min-height: ${IMAGE_HEIGHT}px;
    padding: 10px 20px;
	background-color: #fff;
    line-height: 1.5rem;
	background-color: white;
	border-bottom: 1px solid #e0e0e0;
	list-style-type: none;
	justify-content: space-between;

	@media only screen and (max-width: 600px) {
   		display: block;
	}
`

const ImageAndTitle = styled.div`
	display: flex;
`

const PriceAndVendor = styled.div`
	display: flex;
	@media only screen and (max-width: 600px) {
   		justify-content: space-between;
	}
`

const ImageContainer = styled.div`
	width: ${IMAGE_HEIGHT}px;
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`

const Image = styled.img`
	max-height: ${IMAGE_HEIGHT}px;
	max-width: ${IMAGE_HEIGHT}px;
`

const TitleBox = styled.div`
	text-align: left;
	font-family: 'Roboto', sans-serif;
	color: rgba(0,0,0,0.87);
    line-height: 1.6;
    font-size: 16px;

	a {
		color: rgba(0,0,0,0.87);
		text-decoration: none;
	}
`

const StatusString = styled.span`
	color: ${(props: { available: boolean }) => props.available ? '#4db6ac' : '#ee6e73'};
`

function getStatus(item: Item) {
	const status = item.available ? 'Azonnal kaphato' : (item.nextAvailable || 'Nem kaphato')
	return <StatusString available={item.available}>{status}</StatusString>
}

const ItemComponent = (item: Item) => {
	return (
		<Wrapper>
			<ImageAndTitle>
				<ImageContainer>
					<Image src={item.image} />
					<LanguageComponent language={item.language} />
				</ImageContainer>
				<TitleBox>
					<a href={item.url}>
						{item.title}<br />
						{getStatus(item)}
					</a>
				</TitleBox>
			</ImageAndTitle>
			<PriceAndVendor>
				<PriceComponent {...item.price} />
				<VendorComponent vendor={item.vendor} />
			</PriceAndVendor>
		</Wrapper>
	)
}

export default ItemComponent;