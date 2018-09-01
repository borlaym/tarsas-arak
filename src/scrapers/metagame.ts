import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

function getPrice(el: Element): { original: number, discounted: number } {
	const normalPriceEl = el.querySelector('.saleDetails span');
	const discountPriceEl = el.querySelector('.sale');
	if (normalPriceEl && discountPriceEl) {
		return {
			original: parseInt((normalPriceEl.textContent || '').replace('.', '').replace(' ', ''), 10),
			discounted: parseInt((discountPriceEl.textContent || '').replace('.', '').replace(' ', ''), 10)
		}
	}
	return {
		original: parseInt((el.textContent || '').replace('.', '').replace(' ', ''), 10),
		discounted: 0
	}
}

function scrapeItem(el: HTMLElement): Item | null {
	try {
		const titleEl = el.querySelector('.webshop-list-item-name');
		const priceEl = el.querySelector('h5');
		const imageEl: HTMLImageElement | null = el.querySelector('.thumbnail img');
		if (titleEl && imageEl && priceEl) {
			return {
				title: titleEl.textContent || '',
				language: Language.LanguageIndependent,
				price: getPrice(priceEl),
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