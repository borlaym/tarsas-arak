import * as React from 'react';
import { Vendor } from '../Item';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
`

const VendorImage = styled.img`
	max-height: 70px;
`

function getVendorSrc(vendor: Vendor): string {
	switch (vendor) {
		case Vendor.Szellemlovas:
			return 'https://www.szellemlovas.hu/tarsasjatekok/images/logo.jpg'
		case Vendor.Gemklub:
			return 'https://dqy32rf2htafh.cloudfront.net/skin/frontend/rwd/gemklub/images/logo.gif'
		case Vendor.Metagame:
			return 'https://metagames.hu/img/header/logo-big.png'
		case Vendor.Reflexshop:
			return 'https://reflexshop.cdn.shoprenter.hu/custom/reflexshop/image/cache/w334h75m00/-%20template%20-/logo.png?v=1470732361'

	}
}

export default function VendorComponent(props: { vendor: Vendor}) {
	return (
		<Wrapper>
			<VendorImage src={getVendorSrc(props.vendor)} />
		</Wrapper>
	)
}