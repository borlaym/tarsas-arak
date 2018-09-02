import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

function getPrice(el: Element): { original: number, discounted: number } {
	const oldPrice = el.querySelector('.page_artlist_price_net')
	const specialPrice = el.querySelector('.page_artlist_price_akcio')
	if (oldPrice && specialPrice) {
		return {
			original: parseInt((oldPrice.textContent || '').replace(/([a-zA-Záé:\s])+/g, ''), 10),
			discounted: parseInt((specialPrice.textContent || '').replace(/([a-zA-Záé:\s])+/g, ''), 10)
		}
	}
	console.log('Cant find Tarsasjatekdiszkont price')
	return {
		original: 0,
		discounted: 0
	}
}

class TarsasjatekDiszkontScraper extends Scraper {
	public vendor = Vendor.TarsasjatekDiszkont;
	protected itemSelector = '#page_search_content .page_artlist_item_2';
	protected parseItem(el: HTMLElement): Item | null {
		try {
			const titleEl: HTMLAnchorElement | null = el.querySelector('a.page_artlist_name_link');
			const priceEl = el.querySelector('.page_artlist_price_2');
			const imageEl: HTMLImageElement | null = el.querySelector('.page_artlist_pic_2 img');
			if (titleEl && imageEl && priceEl) {
				return {
					title: titleEl.textContent || '',
					language: Language.LanguageIndependent,
					price: getPrice(priceEl),
					available: true,
					image: imageEl.src,
					vendor: Vendor.TarsasjatekDiszkont,
					nextAvailable: null,
					url: titleEl.href
				}
			}
			console.log('Unable to parse item on Tarsasjatekdiszkont', el);
			return null
		} catch (err) {
			console.log('Unable to parse item on Tarsasjatekdiszkont', el);
			console.log(err)
			return null
		}
	}
}

const instance = new TarsasjatekDiszkontScraper()
export default instance