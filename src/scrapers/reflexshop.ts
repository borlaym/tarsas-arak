import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

function scrapeItem(el: HTMLElement): Item | null {
	try {
		const titleEl: HTMLAnchorElement | null = el.querySelector('a.list-productname-link');
		const normalPriceEl = el.querySelector('.list_price');
		const imageEl: HTMLImageElement | null = el.querySelector('.img-thumbnail-link img');
		if (titleEl && imageEl && normalPriceEl) {
			const priceTextContent = normalPriceEl.textContent || ''
			return {
				title: titleEl.textContent || '',
				language: Language.LanguageIndependent,
				price: {
					original: parseInt(priceTextContent.replace('.', '').replace(' ', ''), 10),
					discounted: 0
				},
				available: true,
				image: imageEl.dataset && imageEl.dataset.src || '',
				vendor: Vendor.Reflexshop,
				nextAvailable: null,
				url: titleEl.href
			}
		}
		console.log('Unable to parse item on Reflexshop', el);
		return null
	} catch (err) {
		console.log('Unable to parse item on Reflexshop', el);
		console.log(err)
		return null
	}
}

export default async function scraper(query: string): Promise<Item[]> {
	try {
		const response = await fetch(`http://localhost:3001/reflexshop/${query}`);
		const html = await response.text();
		const el = document.createElement('html');
		el.innerHTML = html;
		const entries = el.querySelectorAll('.snapshot-list-container .product-snapshot .snapshot_vertical_product');
		const parsed = Array.from(entries).map(scrapeItem);
		return compact(parsed)
	} catch (err) {
		console.log(err);
		return [];
	}
}