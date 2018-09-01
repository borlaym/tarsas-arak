import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

const server = window.location.hostname === 'localhost' ? 'http://localhost:3001/' : 'https://tarsas-kereso.herokuapp.com/';

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

function getAvailable(el: Element): boolean {
	const text = el.textContent || ''
	if (text.indexOf('Készleten') > -1 && text.indexOf('Nincs Készleten') === -1) {
		return true;
	}
	return false
}

function getNextAvailable(el: Element): string | null {
	const text = el.textContent || ''
	if (text.indexOf('Előrendelhető') > -1) {
		return text;
	}
	return null
}

function scrapeItem(el: HTMLElement): Item | null {
	try {
		const titleEl: HTMLAnchorElement | null = el.querySelector('.webshop-list-item-name a');
		const priceEl = el.querySelector('h5');
		const imageEl: HTMLImageElement | null = el.querySelector('.thumbnail img');
		const availability = el.querySelector('h5 + div');
		if (titleEl && imageEl && priceEl && availability) {
			const imageSrc = new URL(imageEl.src);
			imageSrc.hostname = 'metagames.hu';
			const url = new URL(titleEl.href);
			url.hostname = 'metagames.hu';
			return {
				title: titleEl.textContent || '',
				language: Language.LanguageIndependent,
				price: getPrice(priceEl),
				available: getAvailable(availability),
				image: imageSrc.href,
				vendor: Vendor.Metagame,
				nextAvailable: getNextAvailable(availability),
				url: url.href
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
		const response = await fetch(`${server}metagame/${query}`);
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