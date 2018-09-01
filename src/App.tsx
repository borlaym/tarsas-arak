import * as React from 'react';
import szellemlovas from './scrapers/szellemlovas';
import gemklub from './scrapers/gemklub';
import reflexshop from './scrapers/reflexshop';
import metagame from './scrapers/metagame';
import ItemComponent from './components/item-component';
import Item, { Vendor } from './Item';
import SearchComponent from './components/search-input';

const enumToParser = {
	Szellemlovas: szellemlovas,
	Gemklub: gemklub,
	Reflexshop: reflexshop,
	Metagame: metagame
}

class App extends React.Component {
	public state = {
		results: [],
		waitingOn: []
	}

	public componentDidMount() {
		this.startSearch('azul')
	}
	public startSearch = (query: string) => {
		this.setState({
			waitingOn: Object.keys(Vendor),
			results: []
		}, () => {
			Object.keys(Vendor).map((vendor: string) => {
				const parser = enumToParser[vendor]
				parser(query).then((items: Item[]) => this.setState({
					results: [...this.state.results, ...items],
					waitingOn: this.state.waitingOn.filter(v => v !== vendor)
				}))
			})
		})
	}
	public render() {
		return (
			<div>
				<SearchComponent onSearch={this.startSearch} />
				{this.state.waitingOn.length > 0 && (<div>
					Toltes: {this.state.waitingOn.join(', ')}
				</div>)}
				{this.state.results.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
			</div>
		);
	}
}

export default App;
