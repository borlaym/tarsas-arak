import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

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

class SzellemlovasScraper extends Scraper {
	public vendor = Vendor.Szellemlovas;
	protected itemSelector = '.items .view';
	protected parseItem(el: HTMLElement): Item | null {
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
					image: imageEl.src.replace(window.location.origin, 'https://www.szellemlovas.hu'),
					vendor: Vendor.Szellemlovas,
					nextAvailable: getNextAvailable(availability),
					url: linkEl.href.replace(window.location.origin, 'https://www.szellemlovas.hu')
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
}

const instance = new SzellemlovasScraper()
export default instance