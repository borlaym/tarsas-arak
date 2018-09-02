import Item, { Vendor } from "../Item";
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
	 * Parse a single item
	 */
	protected abstract parseItem(el: HTMLElement): Item | null;
	/**
	 * Whether the whole page should be parsed or not.
	 * For example, gemklub will show you unrelated items if there are no search results
	 */
	protected shouldParsePage(el: Document): boolean {
		return true;
	}
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
			const parsed = Array.from(entries).map(this.parseItem);
			return compact(parsed)
		} catch (err) {
			console.log(err);
			return [];
		}
	}
}

export default Scraper