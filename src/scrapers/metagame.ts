import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

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

class MetagameScraper extends Scraper {
	public vendor = Vendor.Metagame;
	protected itemSelector = '.webshop-products-panel .card.webshop-list-item';
	protected parseItem(el: HTMLElement): Item | null {
		try {
			const titleEl: HTMLAnchorElement | null = el.querySelector('.webshop-list-item-name a');
			const priceEl = el.querySelector('h5');
			const imageEl: HTMLImageElement | null = el.querySelector('.thumbnail img');
			const availability = el.querySelector('h5 + div');
			if (titleEl && imageEl && priceEl && availability) {
				return {
					title: titleEl.textContent || '',
					language: Language.LanguageIndependent,
					price: getPrice(priceEl),
					available: getAvailable(availability),
					image: imageEl.src.replace(window.location.href, 'https://www.metagames.hu/'),
					vendor: Vendor.Metagame,
					nextAvailable: getNextAvailable(availability),
					url: titleEl.href.replace(window.location.href, 'https://www.metagames.hu/')
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
}

const instance = new MetagameScraper()
export default instance