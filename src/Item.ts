export enum Language {
	Hungarian,
	English
}

interface Item {
	title: string,
	language: Language,
	price: number,
	available: boolean
}

export default Item;