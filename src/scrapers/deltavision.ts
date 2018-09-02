import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

function getPrice(el: Element): { original: number, discounted: number} {
	const oldPrice = el.querySelector('.old-price')
	const specialPrice = el.querySelector('.special-price')
	if (oldPrice && specialPrice) {
		return {
			original: parseInt((oldPrice.textContent || '').replace(/([a-zA-Záé:])+/g, ''), 10),
			discounted: parseInt((specialPrice.textContent || '').replace(/([a-zA-Záé:])+/g, ''), 10)
		}
	}
	console.log('Cant find deltavision price')
	return {
		original: 0,
		discounted: 0
	}
}

class DeltaVisionScraper extends Scraper {
	public vendor = Vendor.Deltavision;
	protected itemSelector = '.products-grid .item';
	protected parseItem(el: HTMLElement): Item | null {
		try {
			const titleEl: HTMLAnchorElement | null = el.querySelector('.product-name a');
			const priceEl = el.querySelector('.price-box');
			const imageEl: HTMLImageElement | null = el.querySelector('.product-image img');
			if (titleEl && imageEl && priceEl) {
				return {
					title: titleEl.textContent || '',
					language: Language.LanguageIndependent,
					price: getPrice(priceEl),
					available: true,
					image: imageEl.src,
					vendor: Vendor.Deltavision,
					nextAvailable: null,
					url: titleEl.href
				}
			}
			console.log('Unable to parse item on Deltavision', el);
			return null
		} catch (err) {
			console.log('Unable to parse item on Deltavision', el);
			console.log(err)
			return null
		}
	}
}

const instance = new DeltaVisionScraper()
export default instance