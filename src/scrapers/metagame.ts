import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

function scrapeItem(el: HTMLElement): Item | null {
	try {
		const titleEl = el.querySelector('.webshop-list-item-name');
		const normalPriceEl = el.querySelector('.saleDetails span');
		const discountPrice = el.querySelector('.sale');
		const imageEl: HTMLImageElement | null = el.querySelector('.thumbnail img');
		if (titleEl && imageEl && normalPriceEl && discountPrice) {
			const priceTextContent = normalPriceEl.textContent || ''
			return {
				title: titleEl.textContent || '',
				language: Language.LanguageIndependent,
				price: {
					original: parseInt(priceTextContent.replace('.', '').replace(' ', ''), 10),
					discounted: parseInt((discountPrice.textContent || '').replace('.', '').replace(' ', ''), 10)
				},
				available: true,
				image: imageEl.src.replace('http://localhost:3000', 'https://www.metagames.hu'),
				vendor: Vendor.Metagame,
				nextAvailable: null
			}
		}
		console.log('Unable to parse item on Metagame', el);
		return null
	} catch (err) {
		console.log('Unable to parse item on Metagame', el);
		console.log(err)
		return null
	}
}

export default async function scraper(query: string): Promise<Item[]> {
	try {
		const response = await fetch(`http://localhost:3001/metagame/${query}`);
		const html = await response.text();
		const el = document.createElement('html');
		el.innerHTML = html;
		const entries = el.querySelectorAll('.webshop-products-panel .card.webshop-list-item');
		const parsed = Array.from(entries).map(scrapeItem);
		return compact(parsed)
	} catch (err) {
		console.log(err);
		return [];
	}
}