import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

class MetagameScraper extends Scraper {
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, '.webshop-list-item-name a'))
	}
	protected getLanguage(el: Element): Language {
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const normalPriceEl = this.getChild(el, '.saleDetails span');
		const discountPriceEl = this.getChild(el, '.sale');
		if (normalPriceEl && discountPriceEl) {
			return {
				original: parseInt(this.getTextContent(normalPriceEl).replace('.', '').replace(' ', ''), 10),
				discounted: parseInt(this.getTextContent(discountPriceEl).replace('.', '').replace(' ', ''), 10)
			}
		}
		return {
			original: parseInt((el.textContent || '').replace('.', '').replace(' ', ''), 10),
			discounted: 0
		}
	}
	protected getAvailable(el: Element): boolean {
		const text = this.getTextContent(this.getChild(el, 'h5 + div'))
		if (text.indexOf('Készleten') > -1 && text.indexOf('Nincs Készleten') === -1) {
			return true;
		}
		return false
	}
	protected getNextAvailable(el: Element): string | null {
		const text = this.getTextContent(this.getChild(el, 'h5 + div'))
		if (text.indexOf('Előrendelhető') > -1) {
			return text;
		}
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '.thumbnail img');
		return image.src
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, '.webshop-list-item-name a')
		return link.href
	}
	public vendor = Vendor.Metagame;
	protected itemSelector = '.webshop-products-panel .card.webshop-list-item';
}

const instance = new MetagameScraper()
export default instance