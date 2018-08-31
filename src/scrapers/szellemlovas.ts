export default async function scraper(query: string) {
	try {
		const response = await fetch(`http://localhost:3001/szellemlovas`);
		const html = await response.text();
		console.log(html);
	} catch (err) {
		console.log(err);
	}
}