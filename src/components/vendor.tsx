import * as React from 'react';
import { Vendor } from '../Item';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	align-self: flex-end;
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
			return 'https://scontent.fbud4-1.fna.fbcdn.net/v/t1.0-1/p480x480/23843194_1847318291948239_2029021217526980624_n.jpg?_nc_cat=0&oh=8fea075c15843aa814b59fbb77b28d15&oe=5BF14B1E'
		case Vendor.Reflexshop:
			return 'https://scontent.fbud4-1.fna.fbcdn.net/v/t1.0-1/23244435_1971198423146349_3183030814318886329_n.jpg?_nc_cat=0&oh=cf0f3d00df30506c3b3bc6479899e6d9&oe=5BF93D0C'
		case Vendor.Deltavision:
			return 'https://a-games.hu/images/DeltaVision.png'
		case Vendor.TarsasjatekDiszkont:
			return 'https://www.tarsasjatekdiszkont.hu/shop_pic.php?time=1504434319&width=270&height=100&design_element=head_slide_0.png'
	}
}

export default function VendorComponent(props: { vendor: Vendor}) {
	return (
		<Wrapper>
			<VendorImage src={getVendorSrc(props.vendor)} />
		</Wrapper>
	)
}