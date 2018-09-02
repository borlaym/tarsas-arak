import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

function getLanguage(el: Element): Language {
	if (el.querySelector('img[alt="Magyar nyelvű társasjáték"]')) {
		return Language.Hungarian
	} else if (el.querySelector('img[alt="Angol nyelvű társasjáték"]')) {
		return Language.English
	}
	return Language.LanguageIndependent
}

function getAvailable(el: Element): boolean {
	const span = el.querySelector('span');
	if (span && span.title && span.title.indexOf('Azonnal') === 0) {
		return true
	}
	return false
}

function getNextAvailable(el: Element): string | null {
	const span = el.querySelector('span');
	if (span && span.title && span.title.indexOf('Azonnal') === -1 && span.title.indexOf('Előrendelés') === -1) {
		return span.title
	}
	return null
}

class GemklubScraper extends Scraper {
	public vendor = Vendor.Gemklub;
	protected itemSelector = '.category-products .product-item';
	protected shouldParsePage(el: Document) {
		const notice = el.querySelector('.note-msg');
		if (notice) {
			return false;
		}
		return true
	}
	protected parseItem(el: HTMLElement): Item | null {
		try {
			const titleEl = el.querySelector('.prod-name');
			const normalPriceEl = el.querySelector('.normal-price .price');
			const details = el.querySelector('.product-icons');
			const imageEl: HTMLImageElement | null = el.querySelector('.picture-container img');
			const linkEl: HTMLAnchorElement | null = el.querySelector('.prod-name a');
			if (titleEl && imageEl && details && normalPriceEl && linkEl) {
				const priceTextContent = normalPriceEl.textContent || ''
				return {
					title: titleEl.textContent || '',
					language: getLanguage(details),
					price: {
						original: parseInt(priceTextContent.replace('&nbsp;', '').replace(' ', ''), 10),
						discounted: 0
					},
					available: getAvailable(details),
					image: imageEl.src,
					vendor: Vendor.Gemklub,
					nextAvailable: getNextAvailable(details),
					url: linkEl.href
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
}

const instance = new GemklubScraper()
export default instance