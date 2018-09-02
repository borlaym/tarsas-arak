import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

export default class ReflexshopScraper extends Scraper {
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, 'a.list-productname-link'))
	}
	protected getLanguage(el: Element): Language {
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const priceText = this.getTextContent(this.getChild(el, '.list_price'))
		return {
			original: parseInt(priceText.replace('.', '').replace(' ', ''), 10),
			discounted: 0
		}
	}
	protected getAvailable(el: Element): boolean {
		return true
	}
	protected getNextAvailable(el: Element): string | null {
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '.img-thumbnail-link img')
		return image.dataset && image.dataset.src || ''
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, 'a.list-productname-link')
		return link.href
	}
	public vendor = Vendor.Reflexshop;
	protected itemSelector = '.snapshot-list-container .product-snapshot .snapshot_vertical_product'
}