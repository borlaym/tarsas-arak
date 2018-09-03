import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

export default class DeltaVisionScraper extends Scraper {
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, '.product-name a'))
	}
	protected getLanguage(el: Element): Language {
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const oldPrice = this.getTextContent(this.getChild(el, '.old-price'))
		const specialPrice = this.getTextContent(this.getChild(el, '.special-price'))
		return {
			original: parseInt(oldPrice.replace(/([a-zA-Záé:])+/g, ''), 10),
			discounted: parseInt(specialPrice.replace(/([a-zA-Záé:])+/g, ''), 10)
		}
	}
	protected getAvailable(el: Element): boolean | null {
		return null
	}
	protected getNextAvailable(el: Element): string | null {
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '.product-image img')
		return image.src
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, '.product-name a')
		return link.href
	}
	public vendor = Vendor.Deltavision;
	protected itemSelector = '.products-grid .item';
}
