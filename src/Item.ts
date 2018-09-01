export enum Language {
	Hungarian,
	English
}

export enum Vendor {
	Szellemlovas,
	Gemklub
}

interface Item {
	vendor: Vendor,
	title: string,
	language: Language,
	price: {
		original: number,
		discounted: number
	},
	available: boolean,
	nextAvailable: Date | null,
	image: string
}

export default Item;