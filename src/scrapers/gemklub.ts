import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

export default class GemklubScraper extends Scraper {
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, '.prod-name a'))
	}
	protected getLanguage(el: Element): Language {
		if (el.querySelector('img[alt="Magyar nyelvű társasjáték"]')) {
			return Language.Hungarian
		} else if (el.querySelector('img[alt="Angol nyelvű társasjáték"]')) {
			return Language.English
		}
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const price = this.getTextContent(this.getChild(el, '.normal-price .price'))
		return {
			original: parseInt(price.replace('&nbsp;', '').replace(' ', ''), 10),
			discounted: 0
		}
	}
	protected getAvailable(el: Element): boolean {
		const span = this.getChild(el, '.product-icons span')
		if (span.title && span.title.indexOf('Azonnal') === 0) {
			return true
		}
		return false
	}
	protected getNextAvailable(el: Element): string | null {
		const span = this.getChild(el, '.product-icons')
		if (span.title && span.title.indexOf('Azonnal') === -1 && span.title.indexOf('Előrendelés') === -1) {
			return span.title
		}
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '.picture-container img');
		return image.src
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, '.prod-name a')
		return link.href
	}
	public vendor = Vendor.Gemklub;
	protected itemSelector = '.category-products .product-item';
	protected shouldParsePage(el: Document) {
		const notice = el.querySelector('.note-msg');
		if (notice) {
			return false;
		}
		return true
	}
}