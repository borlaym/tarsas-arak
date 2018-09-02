import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

class TarsasjatekDiszkontScraper extends Scraper {
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, 'a.page_artlist_name_link'))
	}
	protected getLanguage(el: Element): Language {
		return Language.LanguageIndependent
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const oldPrice = this.getTextContent(this.getChild(el, '.page_artlist_price_2 .page_artlist_price_net'))
		const specialPrice = this.getTextContent(this.getChild(el, '.page_artlist_price_2 .page_artlist_price_akcio'))
		return {
			original: parseInt(oldPrice.replace(/([a-zA-Záé:\s])+/g, ''), 10),
			discounted: parseInt(specialPrice.replace(/([a-zA-Záé:\s])+/g, ''), 10)
		}
	}
	protected getAvailable(el: Element): boolean {
		return true
	}
	protected getNextAvailable(el: Element): string | null {
		return null
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '.page_artlist_pic_2 img')
		return image.dataset && image.dataset.src || ''
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, 'a.page_artlist_name_link')
		return link.href
	}
	public vendor = Vendor.TarsasjatekDiszkont;
	protected itemSelector = '#page_search_content .page_artlist_item_2';
}

const instance = new TarsasjatekDiszkontScraper()
export default instance