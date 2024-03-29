import * as React from 'react';
import styled from 'styled-components';
import { Language } from '../Item';

const Wrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	line-height: 1;

	img {
		line-height: 1;
		display: block;
	}
`

function getFlagSrc(language: Language): string | null {
	switch (language) {
		case Language.Hungarian:
			return 'https://dqy32rf2htafh.cloudfront.net/skin/frontend/base/default/images/product_icons/sm/ikon_magyar-feljesztesu-tarsasjatek.png'
		case Language.English:
			return 'https://dqy32rf2htafh.cloudfront.net/media/product_language/english.jpg'
		case Language.LanguageIndependent:
			return null
	}
}

export default function LanguageComponent(props: { language: Language }) {
	const flagSrc = getFlagSrc(props.language)
	return (
		<Wrapper>
			{flagSrc ? <img src={flagSrc} /> : <div />}
		</Wrapper>
	)

}