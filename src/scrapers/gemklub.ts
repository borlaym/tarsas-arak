import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

function scrapeItem(el: HTMLElement): Item | null {
	try {
		const titleEl = el.querySelector('.prod-name');
		const normalPriceEl = el.querySelector('.normal-price');
		const details = el.querySelector('.product-icons');
		const imageEl: HTMLImageElement | null = el.querySelector('.picture-container img');
		if (titleEl && imageEl && details && normalPriceEl) {
			return {
				title: titleEl.textContent || '',
				language: Language.English,
				price: {
					original: parseInt(normalPriceEl.textContent || '', 10),
					discounted: 0
				},
				available: true,
				image: imageEl.src,
				vendor: Vendor.Gemklub,
				nextAvailable: null
			}
		}
		console.log('Unable to parse item on Gemklub', el);
		return null
	} catch (err) {
		console.log('Unable to parse item on Gemklub', el);
		console.log(err)
		return null
	}
}

export default async function scraper(query: string): Promise<Item[]> {
	try {
		const response = await fetch(`http://localhost:3001/gemklub/${query}`);
		const html = await response.text();
		const el = document.createElement('html');
		el.innerHTML = html;
		const entries = el.querySelectorAll('.category-products .product-item');
		const parsed = Array.from(entries).map(scrapeItem);
		return compact(parsed)
	} catch (err) {
		console.log(err);
		return [];
	}
}