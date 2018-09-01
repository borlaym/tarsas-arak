import * as React from 'react';
import szellemlovas from './scrapers/szellemlovas';
import gemklub from './scrapers/gemklub';
import reflexshop from './scrapers/reflexshop';
import ItemComponent from './components/item-component';
import Item from './Item';
import SearchComponent from './components/search-input';

class App extends React.Component {
	public state = {
		szellemlovas: [],
		gemklub: [],
		reflexshop: []
	}
	
	public componentDidMount() {
		szellemlovas('azul').then(items => this.setState({ szellemlovas: items }));
		gemklub('azul').then(items => this.setState({ gemklub: items }));
		reflexshop('azul').then(items => this.setState({ reflexshop: items }));
	}
	public startSearch = (query: string) => {
		this.setState({
			szellemlovas: [],
			gemklub: []
		}, () => {
			szellemlovas(query).then(items => this.setState({ szellemlovas: items }))
			gemklub(query).then(items => this.setState({ gemklub: items }))
			reflexshop(query).then(items => this.setState({ reflexshop: items }))
		})
	}
	public render() {
		const allItems = [
			...this.state.szellemlovas,
			...this.state.gemklub,
			...this.state.reflexshop
		]
		return (
			<div>
				<SearchComponent onSearch={this.startSearch} />
				{allItems.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
			</div>
		);
	}
}

export default App;
