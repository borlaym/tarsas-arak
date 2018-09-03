export enum Language {
	Hungarian,
	English,
	LanguageIndependent
}

export enum Vendor {
	Szellemlovas = 'Szellemlovas',
	Gemklub = 'Gemklub',
	Metagame = 'Metagame',
	Reflexshop = 'Reflexshop',
	Deltavision = 'Deltavision',
	TarsasjatekDiszkont = 'TarsasjatekDiszkont'
}

interface Item {
	vendor: Vendor,
	title: string,
	language: Language,
	price: {
		original: number,
		discounted: number
	},
	available: boolean | null,
	nextAvailable: string | null,
	image: string,
	url: string
}

export default Item;