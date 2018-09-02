import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

export default class TarsasjatekDiszkontScraper extends Scraper {
	protected getTitle(el: Element): string {
		const selector = this.shouldUseSinglePageParse ? '.page_artdet_name_2' : '.page_artlist_name_2'
		return this.getTextContent(this.getChild(el, selector))
	}
	protected getLanguage(el: Element): Language {
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const oldPrice = this.shouldUseSinglePageParse ?
			this.getTextContent(this.getChild(el, '.page_artdet_price_net')) :
			this.getTextContent(this.getChild(el, '.page_artlist_price_2 .page_artlist_price_net'))
		const specialPrice = this.shouldUseSinglePageParse ?
			this.getTextContent(this.getChild(el, '.page_artdet_price_akcio span[itemprop="price"]')) :
			this.getTextContent(this.getChild(el, '.page_artlist_price_2 .page_artlist_price_akcio'))
		return {
			original: parseInt(oldPrice.replace(/([a-zA-Záé:\s])+/g, ''), 10),
			discounted: parseInt(specialPrice.replace(/([a-zA-Záéó:\s])+/g, ''), 10)
		}
	}
	protected getAvailable(el: Element): boolean {
		// TODO: single pagenel meg tudjuk mondani
		return true
	}
	protected getNextAvailable(el: Element): string | null {
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.shouldUseSinglePageParse ?
			this.getChild(el, 'img#main_image') :
			this.getChild(el, '.page_artlist_pic_2 img')
		return image.src
	}
	protected getUrl(el: Element): string {
		if (this.shouldUseSinglePageParse) {
			return `https://www.tarsasjatekdiszkont.hu/shop_search.php?search=${this.query}`
		}
		const link: HTMLAnchorElement = this.getChild(el, 'a.page_artlist_name_link')
		return link.href
	}
	protected get shouldUseSinglePageParse() {
		return !this.document.querySelector('#page_search_content')
	}
	public vendor = Vendor.TarsasjatekDiszkont;
	protected itemSelector = '#page_search_content .page_artlist_item_2';
}