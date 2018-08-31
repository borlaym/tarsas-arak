import Item, { Language } from "../Item";

function scrapeItem(el: HTMLElement): Item {
	const titleEl = el.querySelector('.listcim');
	const normalPriceEl = el.querySelector('.normalprice');
	const discountPriceEl = el.querySelector('.discountprice');
	const availability = el.querySelector('.szallitasi_ido');
	if (titleEl && availability) {
		const orderable = (availability.textContent || '').indexOf('Nem rendelhető') === -1;
		const priceToUse = discountPriceEl || normalPriceEl;
		const language = (titleEl.textContent || '').indexOf('Magyar nyelvű') > -1 ? Language.Hungarian : Language.English;
		return {
			title: titleEl.textContent || '',
			language,
			price: orderable && priceToUse ? parseInt(priceToUse.textContent || '', 10) : 0,
			available: true
		}
	}
	throw new Error('Unable to parse item on Szellemlovas');
}

export default async function scraper(query: string): Promise<Item[]> {
	try {
		const response = await fetch(`http://localhost:3001/szellemlovas/${query}`);
		const html = await response.text();
		const el = document.createElement('html');
		el.innerHTML = html;
		const entries = el.querySelectorAll('.items .view');
		return Array.from(entries).map(scrapeItem);
	} catch (err) {
		console.log(err);
		return [];
	}
}