import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

const server = window.location.hostname === 'localhost' ? 'http://localhost:3001/' : 'https://tarsas-kereso.herokuapp.com/';

function getAvailable(el: Element): boolean {
	const text = (el.textContent || '');
	if (text.indexOf('Nem rendelhető') > -1) {
		return false;
	}
	if (text.indexOf('Azonnal kapható') > -1) {
		return true;
	}
	if (text.indexOf('Várható érkezés') > -1) {
		return false;
	}
	if (text.indexOf('Kikölcsönözve') > -1) {
		return false;
	}
	if (text.indexOf('Előrendelhető') > -1) {
		return false;
	}
	console.log('Not parsed availability on Gemklub: ' + text);
	return true;
}

function getNextAvailable(el: Element): string | null {
	const text = el.textContent || ''
	if (text.indexOf('Azonnal kapható') > -1) {
		return null;
	}
	return text
}

function scrapeItem(el: HTMLElement): Item | null {
	try {

		const titleEl = el.querySelector('.listcim');
		const linkEl: HTMLAnchorElement | null = el.querySelector('.listcim a');
		const normalPriceEl = el.querySelector('.normalprice');
		const originalPriceEl = el.querySelector('.originalprice');
		const discountPriceEl = el.querySelector('.discountprice');
		const availability = el.querySelector('.szallitasi_ido');
		const details = el.querySelector('#list_3h');
		const imageEl: HTMLImageElement | null = el.querySelector('#list_1h img');
		if (titleEl && availability && imageEl && details && linkEl) {
			const orderable = (availability.textContent || '').indexOf('Nem rendelhető') === -1;
			const priceToUse = originalPriceEl || normalPriceEl;
			const language = (details.textContent || '').indexOf('Magyar nyelvű') > -1 ? Language.Hungarian : Language.English;
			return {
				title: titleEl.textContent || '',
				language,
				price: {
					original: orderable && priceToUse ? parseInt(priceToUse.textContent || '', 10) : 0,
					discounted: orderable && discountPriceEl ? parseInt(discountPriceEl.textContent || '', 10) : 0
				},
				available: getAvailable(availability),
				image: imageEl.src.replace(server, 'https://www.szellemlovas.hu'),
				vendor: Vendor.Szellemlovas,
				nextAvailable: getNextAvailable(availability),
				url: linkEl.href.replace(server, 'https://www.szellemlovas.hu')
			}
		}
		console.log('Unable to parse item on Szellemlovas', el);
		return null
	} catch (err) {
		console.log('Unable to parse item on Szellemlovas', el);
		console.log(err)
		return null
	}
}

export default async function scraper(query: string): Promise<Item[]> {
	try {
		const response = await fetch(`${server}szellemlovas/${query}`);
		const html = await response.text();
		const el = document.createElement('html');
		el.innerHTML = html;
		const entries = el.querySelectorAll('.items .view');
		const parsed = Array.from(entries).map(scrapeItem);
		return compact(parsed)
	} catch (err) {
		console.log(err);
		return [];
	}
}