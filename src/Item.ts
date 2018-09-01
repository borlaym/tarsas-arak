export enum Language {
	Hungarian,
	English,
	LanguageIndependent
}

export enum Vendor {
	Szellemlovas = 'Szellemlovas',
	Gemklub = 'Gemklub',
	Metagame = 'Metagame',
	Reflexshop = 'Reflexshop'
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