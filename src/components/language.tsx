import * as React from 'react';
import styled from 'styled-components';
import { Language } from '../Item';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
`

function getFlagSrc(language: Language) {
	switch (language) {
		case Language.Hungarian:
			return 'https://dqy32rf2htafh.cloudfront.net/skin/frontend/base/default/images/product_icons/sm/ikon_magyar-feljesztesu-tarsasjatek.png'
		case Language.English:
			return 'https://dqy32rf2htafh.cloudfront.net/media/product_language/english.jpg'
	}
}

export default function LanguageComponent(props: { language: Language }) {
	return (
		<Wrapper>
			<img src={getFlagSrc(props.language)} />
		</Wrapper>
	)

}