import Item, { Vendor, Language } from "../Item";
import { compact } from "lodash";

const SERVER_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001/' : 'https://tarsas-kereso.herokuapp.com/';

abstract class Scraper {
	/**
	 * The vendor the scraper is created for
	 */
	public abstract readonly vendor: Vendor;
	/**
	 * CSS selector to find a single item
	 */
	protected abstract readonly itemSelector: string;
	/**
	 * Whether the whole page should be parsed or not.
	 * For example, gemklub will show you unrelated items if there are no search results
	 */
	protected shouldParsePage(el: Document): boolean {
		return true;
	}
	/**
	 * Various field getters
	 */
	protected abstract getTitle(el: Element): string;
	protected abstract getLanguage(el: Element): Language;
	protected abstract getPrice(el: Element): { original: number, discounted: number };
	protected abstract getAvailable(el: Element): boolean;
	protected abstract getNextAvailable(el: Element): string | null;
	protected abstract getImageSrc(el: Element): string;
	protected abstract getUrl(el: Element): string;
	/**
	 * Do a search for items of a query
	 */
	public async search(query: string): Promise<Item[]> {
		try {
			const response = await fetch(`${SERVER_URL}${this.vendor.toLowerCase()}/${query}`);
			const html = await response.text();
			const el = document.implementation.createHTMLDocument('virtual')
			el.write(html)
			if (this.shouldParsePage) {
				if (!this.shouldParsePage(el)) {
					return [];
				}
			}
			const entries = el.querySelectorAll(this.itemSelector);
			const parsed = Array.from(entries).map((entry: HTMLElement) => this.parseItem(entry));
			return compact(parsed)
		} catch (err) {
			console.log(err);
			return [];
		}
	}
	/**
	 * Parse a single item
	 */
	private parseItem(el: HTMLElement): Item {
		return {
			vendor: this.vendor,
			title: this.getTitle(el),
			language: this.getLanguage(el),
			price: this.getPrice(el),
			available: this.getAvailable(el),
			nextAvailable: this.getNextAvailable(el),
			image: this.getImageSrc(el),
			url: this.getUrl(el)
		}
	}
	/**
	 * Helper for getting an element with standardized error handling
	 */
	protected getChild<T extends HTMLElement>(parent: Element, selector: string): T {
		const result: T | null = parent.querySelector(selector);
		if (!result) {
			throw new Error('Unable to find element ' + selector + ' in scraper ' + this.vendor)
		}
		return result
	}
	/**
	 * Helper for getting the text content of an element with standardized logging
	 */
	protected getTextContent(el: Element): string {
		const textContent = el.textContent
		if (!textContent) {
			console.log('No text content in element ' + el.className + ' in scraper ' + this.vendor)
		}
		return textContent || ''
	}
}

export default Scraper