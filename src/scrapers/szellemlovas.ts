import { Language, Vendor } from "../Item";
import Scraper from "./Scraper";

export default class SzellemlovasScraper extends Scraper {
	public vendor = Vendor.Szellemlovas;
	protected itemSelector = '.items .view';
	protected getTitle(el: Element): string {
		return this.getTextContent(this.getChild(el, '.listcim'))
	}
	protected getLanguage(el: Element): Language {
		const text = this.getTextContent(this.getChild(el, '#list_3h'))
		// TODO nyelvfuggetlen
		return text.indexOf('Magyar') > -1 ? Language.Hungarian : Language.English;
	}
	protected getPrice(el: Element): { original: number; discounted: number; } {
		const normalPriceEl = el.querySelector('.normalprice');
		const originalPriceEl = el.querySelector('.originalprice');
		const discountPriceEl = el.querySelector('.discountprice');
		const orderable = this.getTextContent(this.getChild(el, '.szallitasi_ido')).indexOf('Nem rendelhető') === -1
		const priceToUse = originalPriceEl || normalPriceEl;
		return {
			original: orderable && priceToUse ? parseInt(priceToUse.textContent || '', 10) : 0,
			discounted: orderable && discountPriceEl ? parseInt(discountPriceEl.textContent || '', 10) : 0
		}
	}
	protected getAvailable(el: Element): boolean {
		const text = this.getTextContent(this.getChild(el, '.szallitasi_ido'))
		if (text.indexOf('Nem rendelhető') > -1) {
			return false;
		}
		if (text.indexOf('Azonnal kapható') > -1) {
			return true;
		}
		if (text.indexOf('Várható érkezés') > -1) {
			return false;
		}
		if (text.indexOf('Kikölcsönözve') > -1) {
			return false;
		}
		if (text.indexOf('Előrendelhető') > -1) {
			return false;
		}
		console.log('Not parsed availability on Gemklub: ' + text);
		return true;
	}
	protected getNextAvailable(el: Element): string | null {
		const text = this.getTextContent(this.getChild(el, '.szallitasi_ido'))
		if (text.indexOf('Azonnal kapható') > -1) {
			return null;
		}
		return text
	}
	protected getImageSrc(el: Element): string {
		const image: HTMLImageElement = this.getChild(el, '#list_1h img')
		return image.src.replace(window.location.origin, 'https://www.szellemlovas.hu')
	}
	protected getUrl(el: Element): string {
		const link: HTMLAnchorElement = this.getChild(el, '.listcim a')
		return link.href.replace(window.location.origin, 'https://www.szellemlovas.hu')
	}
}