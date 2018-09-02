import * as React from 'react';
import szellemlovas from './scrapers/szellemlovas';
import gemklub from './scrapers/gemklub';
import reflexshop from './scrapers/reflexshop';
import metagame from './scrapers/metagame';
import deltavision from './scrapers/deltavision';
import tarsasjatekdiszkont from './scrapers/tarsasjatekdiszkont';
import ItemComponent from './components/item-component';
import Item, { Vendor } from './Item';
import SearchComponent from './components/search-input';
import styled from 'styled-components';

const enumToScraper = {
	Szellemlovas: szellemlovas,
	Gemklub: gemklub,
	Reflexshop: reflexshop,
	Metagame: metagame,
	Deltavision: deltavision,
	TarsasjatekDiszkont: tarsasjatekdiszkont
}

const List = styled.ul`
	margin: 20px 0;
	padding: 0 20px;
`

class App extends React.Component {
	public state = {
		results: [],
		waitingOn: []
	}

	public startSearch = (query: string) => {
		this.setState({
			waitingOn: Object.keys(Vendor),
			results: []
		}, () => {
			Object.keys(Vendor).map((vendor: string) => {
				const scraper = new enumToScraper[vendor](query)
				scraper.search().then((items: Item[]) => this.setState({
					results: [...this.state.results, ...items],
					waitingOn: this.state.waitingOn.filter(v => v !== vendor)
				}))
			})
		})
	}
	public render() {
		return (
			<div>
				<SearchComponent onSearch={this.startSearch} loading={this.state.waitingOn.length} />
				<List>
					{this.state.results.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
				</List>
			</div>
		);
	}
}

export default App;
