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
	}
}

export default function VendorComponent(props: { vendor: Vendor}) {
	return (
		<Wrapper>
			<VendorImage src={getVendorSrc(props.vendor)} />
		</Wrapper>
	)
}