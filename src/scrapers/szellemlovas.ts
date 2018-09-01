import Item, { Language, Vendor } from "../Item";
import { compact } from 'lodash'

function scrapeItem(el: HTMLElement): Item | null {
	try {

		const titleEl = el.querySelector('.listcim');
		const normalPriceEl = el.querySelector('.normalprice');
		const originalPriceEl = el.querySelector('.originalprice');
		const discountPriceEl = el.querySelector('.discountprice');
		const availability = el.querySelector('.szallitasi_ido');
		const details = el.querySelector('#list_3h');
		const imageEl: HTMLImageElement | null = el.querySelector('#list_1h img');
		if (titleEl && availability && imageEl && details) {
			const orderable = (availability.textContent || '').indexOf('Nem rendelhető') === -1;
			const priceToUse = originalPriceEl || normalPriceEl;
			const language = (details.textContent || '').indexOf('Magyar nyelvű') > -1 ? Language.Hungarian : Language.English;
			const nextAvailable = (availability.textContent || '').match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
			return {
				title: titleEl.textContent || '',
				language,
				price: {
					original: orderable && priceToUse ? parseInt(priceToUse.textContent || '', 10) : 0,
					discounted: orderable && discountPriceEl ? parseInt(discountPriceEl.textContent || '', 10) : 0
				},
				available: true,
				image: imageEl.src.replace('http://localhost:3000', 'https://www.szellemlovas.hu'),
				vendor: Vendor.Szellemlovas,
				nextAvailable: nextAvailable ? new Date(nextAvailable[0]) : null
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
		const response = await fetch(`http://localhost:3001/szellemlovas/${query}`);
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