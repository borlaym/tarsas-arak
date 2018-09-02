import Item, { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

class ReflexshopScraper extends Scraper {
	public vendor = Vendor.Reflexshop;
	protected itemSelector = '.snapshot-list-container .product-snapshot .snapshot_vertical_product'
	protected parseItem(el: HTMLElement): Item | null {
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
}

const instance = new ReflexshopScraper()
export default instance